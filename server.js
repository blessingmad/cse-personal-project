require('dotenv').config();

//import express framework
const express = require ('express');
// require body-parser module
const bodyParser = require('body-parser');
//import database connection mobule
const mongodb = require('./data/database');
//requier passport module
const passport = require('passport');

const session = require('express-session');

const GitHubStrategy = require('passport-github2').Strategy;




const cors = require('cors');



//create an express application
const app = express();

const port = process.env.PORT || 3001;  //Define port




app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave:false,
        saveUninitialized: true ,

    }))
    // Basic expresss session ({..}) initialized
    .use(passport.initialize())
    // init passport on every route call
    .use(passport.session())
    .use((req, res, next) => {
     res.setHeader('Acceess-Control-Allow-Origin', '*');
     res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Z-key'
     );
     res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
     next();
    })
    .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE','PUT', 'PATCH']}))
    .use(cors({origin: '*'}))
    .use('/', require('./routes/index.js'));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb){
        return cb(null, profile);
    }
));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Loggedin as ${req.session.user.displayName}` :'Logged Out')});
// set up github callback
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

///app.use('/', require('./routes')); // use route handlers from routes module
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