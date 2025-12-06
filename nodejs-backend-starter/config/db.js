const mongoose = require('mongoose');
const config = require('../config/env');

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.mongoUrl);
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
