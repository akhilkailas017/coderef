const compression = require('compression');

module.exports = compression({
  level: 6,
  threshold: 1024
});
