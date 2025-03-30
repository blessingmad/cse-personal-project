const swaggerAutogen = require ('swagger-autogen')(); // import swagger auto generator.

// define the Swagger documentation details.
const doc = {
    info: { 
        title: 'Cars Api', // Api title
        description: 'Cars Api' // description
    },
    host: 'cse-personal-project-2.onrender.com', // Api host 
    schemes: ['https', 'http'] // supported protocols.
};

const outputFile = './swagger.json'; //specify the output file for the generated swagger JSON

const endpointsFiles = ['./routes/index.js']; // Define the entry point for route scanning 

swaggerAutogen(outputFile, endpointsFiles, doc); // generate the Swagger documentation based on routes.
