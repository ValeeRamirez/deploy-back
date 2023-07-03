const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-koa');
const { Barco } = require('./models/barco'); // Import Barco model from barcos.js

const options = {
  swaggerDefinition: {
    info: {
      title: 'Documentación Dupla7',
      version: '3.0.0',
      description: 'Documentación del juego creado por el grupo: Dupla7 para el ramo Tecnología y aplicaciones web 2023-1',
    },
    basePath: '/', // Modify this according to your API base path
  },
  apis: ['src/routes/*.js'], // Path to your Koa route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use(swaggerUi.serve);
  app.use(swaggerUi.setup(swaggerSpec));
};
