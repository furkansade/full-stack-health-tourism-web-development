const adminAuthController = require('../../controllers/adminAuthController');
const express = require('express');

const router = express.Router();

router.route('/').post(adminAuthController.createOneAdminUser);
router.route('/login').post(adminAuthController.loginOneAdminUser);
router.route('/logout').get(adminAuthController.logoutOneAdminUser);


module.exports = router;
