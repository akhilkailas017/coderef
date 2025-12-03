const mongoose = require('mongoose');
const config = require('../config/env');

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.mongoUrl);
    console.log('DB Connected');
  } catch (err) {
    console.error('DB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
