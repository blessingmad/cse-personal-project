const router = require ('express').Router(); //import express router
const passport = require('passport');


//use swagger documentation route.
router.use('/', require('./swagger'));

//swagger tag to categorize this endpoint under cars
router.get('/',(req, res) => {
    //swagger.tag=['cars']
    res.send ('Hello World');}); // send a basic rsponse when reaching the root url

// route for handling car related requests.
router.use('/cars', require('./cars'));


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/');
    });
});

// export the router to be used in the other parts of thw app. 
module.exports = router;