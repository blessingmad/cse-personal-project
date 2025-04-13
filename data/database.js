const dotenv = require('dotenv'); // load enviroment variables from a .env file
dotenv.config();

const MongoClient = require('mongodb').MongoClient; // import MongoDB client from the mongodb package

let database; // variable to store the database connection

//initiate the database connection.
const initDb = (callback) => {
    // if database is initiated,  return database.
    if (database) {
        console.log('db is initalized');
        return callback(null, database);
    }
   //console.log(process.env.MONGODB_URL)
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client.db('Newproject', 'Project');
        callback(null,database); //return the started database
    })
    .catch((err) => {
        console.error ('Database connection errors', err);
        callback(err); // pass the error to the callback
    });

};
/**
 * retrieve the initialized database connections
 * if the database is not initialized, it throws an error.
 */

// export the functions to be used in other parts of the application.
const getDatabase = () => {
    if (!database) {
        throw Error('Database not initalized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};