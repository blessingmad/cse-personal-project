const express = require('express');
const router = express.Router();

// import the controller for handling car-related requests
const carsController = require('../controller/cars');

// route to get all cars.
router.get('/', carsController.getAll);

router.get('/:id', carsController.getSingle); // route to get a car by id.

router.post('/', carsController.createCar); // route to create a new car 

router.put('/:id', carsController.updateCar); // route to update exixting car

router.delete('/:id', carsController.deleteCar); // route to delete a car by id.

module.exports = router; // export module to be used in other parts of the application.