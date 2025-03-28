const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //swagger.tag=['Users']

    const result = await mongodb.getDatabase().db('Newproject').collection('cars').find();
    result.toArray().then((cars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });

};

const getSingle = async (req, res) => {
    //swagger.tag=['Users']
    if (!ObjectId.isValid (req.params.id )){
        return res.status(400).json({err:'Invalid id formart'});
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('Newproject').collection('cars').find( {_id: carId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(cars[0]);
    });
};



const createCar = async (req, res) => {
    //swagger.tag=['Users']
    const carId = new ObjectId(req, params.id)
    const car = {
        brandName: req.body.brandName,
        ownerEmail: req.body.ownerEmail,
        model: req.body.model,
        location: req.body.location,
        milage: req.body.milage
    };
    const response = await mongodb.getDatabase().db().collection('cars').insertOne(car);
    if (response.acknowledged) {
        res.status(204).send();
    } 
    else {
        res.status(500).json(response.error || 'Some error occured while updating the contact.');
    };

    };
     
    const updateCar = async (req, res) => {
        const carId = new ObjectId(req. params.id);
        const car = {
            brandName: req.body.brandName,
            ownerEmail: req.body.ownerEmail,
            model: req.body.model,
            location: req.body.location,
            milage: req.body.milage
           
        };
        const response = await mongodb.getDatabase().db().collection('cars').replaceOne({_id: carId}, car);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } 
        else {
            res.status(500).json(response.error || 'Some error occured while updating the contact.');
        }
    };

const deleteCar = async (req, res) => {
    const UserId = new ObjectId(req, params.id);
    const response = await mongodb.getDatabase().db().collection('cars').remove({_id: carId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some errors occured while deleting the contact.');

    };
        
};



module.exports = {
    getAll,
    getSingle,
    createCar,
    updateCar,
    deleteCar 
};