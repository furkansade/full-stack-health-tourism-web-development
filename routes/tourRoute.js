const tourController = require('../controllers/tourController');
const express = require('express');


const router = express.Router();

router.route('/').post(tourController.createTour);
router.route('/').get(tourController.getAllTours);
router.route('/:slug').get(tourController.getOneTour);
router.route('/:id').delete(tourController.deleteOneTour);
router.route('/:slug').put(tourController.updateOneTour);

module.exports = router;
