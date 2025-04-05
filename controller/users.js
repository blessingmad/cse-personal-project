const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //swagger.tag=['Users']

    const result = await mongodb.getDatabase ().collection('users').find();
    result.toArray().then((users) => {
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
    const result = await mongodb.getDatabase ().collection('users').find( {_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    //swagger.tag=['Users']
    const userId = new ObjectId(req.params.id)
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } 
    else {
        res.status(500).json(response.error || 'Some error occured while updating the contact.');
    };

    };
     
    const updateUser = async (req, res) => {
        const userId = new ObjectId(req.params.id);
        const user = {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            ipaddress: req.body.ipaddress
        };
        const response = await mongodb.getDatabase().collection('users').replaceOne({_id: userId}, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } 
        else {
            res.status(500).json(response.error || 'Some error occured while updating the contact.');
        }
    };

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase ().collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some errors occured while deleting the contact.');

    };
        
};



module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};