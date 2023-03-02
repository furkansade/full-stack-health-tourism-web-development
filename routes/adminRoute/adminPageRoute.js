const adminController = require('../../controllers/adminController');
const adminAuthMiddleware = require('../../middlewares/adminMiddlewares/adminAuthMiddleware')
const adminRedirectMiddleware = require('../../middlewares/adminMiddlewares/adminRedirectMiddleware')
const express = require('express');

const router = express.Router();

router.route('/').get(adminAuthMiddleware, adminController.getAdminPage);
router.route('/categories').get(adminAuthMiddleware, adminController.getAdminCategoriesPage);
router.route('/companies').get(adminAuthMiddleware, adminController.getAdminCompaniesPage);
router.route('/hotels').get(adminAuthMiddleware, adminController.getAdminHotelsPage);
router.route('/tours').get(adminAuthMiddleware, adminController.getAdminToursPage);
router.route('/customers').get(adminAuthMiddleware, adminController.getAdminCustomersPage);
router.route('/blogs').get(adminAuthMiddleware, adminController.getAdminBlogsPage);
router.route('/faqs').get(adminAuthMiddleware, adminController.getAdminFaqsPage);

router.route('/login').get(adminRedirectMiddleware, adminController.getAdminLoginPage);

module.exports = router;
