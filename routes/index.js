const router = require ('express').Router(); //import express router

//use swagger documentation route.
router.use('/', require('./swagger'));

//swagger tag to categorize this endpoint under cars
router.get('/',(req, res) => {
    //swagger.tag=['cars']
    res.send ('Hello World');}); // send a basic rsponse when reaching the root url

// route for handling car related requests.
router.use('/cars', require('./cars'));

// export the router to be used in the other parts of thw app. 
module.exports = router;