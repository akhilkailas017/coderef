const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

function loadSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = loadSwagger;
