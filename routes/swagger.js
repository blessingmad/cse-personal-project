const router = require('express').Router(); // import express route

const swaggerUi = require('swagger-ui-express'); // import swagger UI middleware

const swaggerDocument = require('../swagger.json'); // import swagger documentation JSON file

router.use('/api-docs', swaggerUi.serve); // serve Swagger at '/api-docs' endpoint

router.use('/api-docs', swaggerUi.setup(swaggerDocument)); // setup swagger with the provided swagger document.

module.exports = router; // import the router to be used in the main app. 