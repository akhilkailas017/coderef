const mongoose = require('mongoose');
const config = require('../config/env');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.mongoUrl);
    logger.info('Database connected');
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
