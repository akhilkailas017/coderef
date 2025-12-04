const compression = require('compression');

module.exports = compression({
  level: 6,
  threshold: 1024,
  brotli: {
    enabled: true,
    zlib: {}
  },

  filter: (req, res) => {
    const contentType = res.getHeader('Content-Type');
    if (
      contentType &&
      (contentType.includes('image/') ||
        contentType.includes('video/') ||
        contentType.includes('audio/') ||
        contentType.includes('zip') ||
        contentType.includes('gzip') ||
        contentType.includes('application/pdf'))
    ) {
      return false;
    }

    return compression.filter(req, res);
  }
});
