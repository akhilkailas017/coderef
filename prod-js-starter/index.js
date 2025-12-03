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

const app = express();

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
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({ server: 'ok', database: states[mongoose.connection.readyState] });
});

app.listen(config.app.port, () =>
  console.log(`Server running on port ${config.app.port}`)
);
