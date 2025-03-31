//import express framework
const express = require ('express');
// require body-parser module
const bodyParser = require('body-parser');
//import database connection mobule
const mongodb = require('./data/database');

//create an express application
const app = express();

const port = process.env.PORT || 3001;  //Define port




app.use(bodyParser.json());
app.use((req, res, next) => {
     res.setHeader('Acceess-Control-Allow-Origin', '*');
     res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Z-key'
     );
     res.setHeader('Access-Control-Allow-Method', 'GET, POST, DELETE, OPTIONS');
     next();
});

app.use('/', require('./routes')); // use route handlers from routes module
// initiate database connections
mongodb.initDb((err )=> {
    if (err){
        console.log;
    }
    else {
        console.log(`Database is listening at and node running on port ${port}`); // log database successful.
    }
});

// start the server and listen to the port.
app.listen (port, () => {console.log(`Running on port ${port}`)});