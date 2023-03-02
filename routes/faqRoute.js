const faqController = require('../controllers/faqController');
const express = require('express');


const router = express.Router();

router.route('/').post(faqController.createFaq);
router.route('/').get(faqController.getAllFaqs);
router.route('/:slug').get(faqController.getOneFaq);
router.route('/:id').delete(faqController.deleteOneFaq);


module.exports = router;
