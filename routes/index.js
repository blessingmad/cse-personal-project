const router = require ('express').Router();

router.use('/', require('./swagger'));

router.get('/',(req, res) => {
    //swagger.tag=['cars']
    res.send ('Hello World');});

router.use('/cars', require('./cars'));

module.exports = router;