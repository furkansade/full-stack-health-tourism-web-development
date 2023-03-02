const companyController = require('../controllers/companyController')
const express = require('express')

const router = express.Router() 

router.route('/').post(companyController.createCompany)
router.route('/').get(companyController.getAllCompanies)
router.route('/:slug').get(companyController.getOneCompany)
router.route('/:id').delete(companyController.deleteCompany)
router.route('/:slug').put(companyController.updateCompany)

module.exports = router;