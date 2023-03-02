const customerController = require('../controllers/customerController')


const express = require('express')

const router = express.Router();


router.route('/').post(customerController.createCustomer)
router.route('/').get(customerController.getAllCustomers)
router.route('/:id').get(customerController.getOneCustomer)
router.route('/:id').delete(customerController.deleteOneCustomer)





module.exports = router