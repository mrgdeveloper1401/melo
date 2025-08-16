// swagger-autogen.js
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = [
    '../admin/*.js',
    '../user/*.js'
];

const config = {
  info: {
    title: 'Melo API',
    description: 'API Documentation'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

swaggerAutogen(outputFile, endpointsFiles, config);