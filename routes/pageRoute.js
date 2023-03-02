const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware')
const express = require('express');

const router = express.Router();

router.route('/').get(pageController.getHomePage);
router.route('/about').get(pageController.getAboutPage);
router.route('/companies').get(pageController.getCompaniesPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/faqs').get(pageController.getFaqsPage);

router.route('/company/:slug').get(pageController.getSingleCompanyPage);

router.route('/404').get(pageController.getNotFoundPage)

router.route('/register').get(redirectMiddleware, pageController.getRegisterPage)
router.route('/register/company').get(redirectMiddleware, pageController.getRegisterCompanyPage)
router.route('/login').get(redirectMiddleware, pageController.getLoginPage)


module.exports = router;
