//Swagger UI
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    basePath: '/my_route',
    host: 'localhost:3443',
    schemes: ['http'],
};

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/*.js', './modules/*.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);


