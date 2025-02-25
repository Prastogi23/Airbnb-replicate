require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const doc = {
    info: {
        title: 'WnaderLust',
        description: 'Hotel and property for stay',
    },
    host: `${HOST}:${PORT}`,
};

const outputFile = './swagger-output.json';
const routes = ['./routes/listingroute'];

swaggerAutogen(outputFile, routes, doc);