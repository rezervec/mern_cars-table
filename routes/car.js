const express = require('express');
const router = express.Router(); 
const { createCar, displayCars } = require("../controllers/carController");


router.post('/create', createCar);
router.get('/display', displayCars);


module.exports = router;