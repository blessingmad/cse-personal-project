const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    
    if (database) {
        console.log('db is initalized');
        return callback(null, database);
    }
   //console.log(process.env.MONGODB_URL)
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client;
        callback(null,database);
    })
    .catch((err) => {
        console.error ('Database connection errors', err);
        callback(err);
    });

};

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