const hotelController = require('../controllers/hotelController');
const express = require('express');


const router = express.Router();

router.route('/').post(hotelController.createHotel);
router.route('/').get(hotelController.getAllHotels);
router.route('/:slug').get(hotelController.getOneHotel);
router.route('/:id').delete(hotelController.deleteOneHotel);
router.route('/:slug').put(hotelController.updateOneHotel);

module.exports = router;
