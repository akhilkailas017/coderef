const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/env');
const compressor = require('./middleware/compressor');
const { globalLimiter } = require('./middleware/rateLimiter');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, './swagger/swagger.json'))
);

const app = express();
app.use(helmet());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
connectDB();
app.use(compressor);
app.use(globalLimiter);
app.use(cors({ origin: config.app.corsOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.get('/status', async (req, res) => {
  const mongoose = require('mongoose');
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const dbState = dbStates[mongoose.connection.readyState];
  const start = performance.now();
  try {
    await mongoose.connection.db.admin().ping();
  } catch (err) {}
  const dbPingMs = (performance.now() - start).toFixed(2);
  const memory = process.memoryUsage();

  res.json({
    server: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),

    database: {
      state: dbState,
      pingMs: dbPingMs
    },

    memory: {
      rss: memory.rss,
      heapTotal: memory.heapTotal,
      heapUsed: memory.heapUsed,
      external: memory.external
    }
  });
});

app.listen(config.app.port, () =>
  console.log(`Server running on port ${config.app.port}`)
);
