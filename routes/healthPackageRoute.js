const express = require('express');
const healthPackageController = require('../controllers/healthPackageController');
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router();

router.route('/').get(healthPackageController.getAllHealthPackages);
router.route('/').post(roleMiddleware(["Company", "Admin"]), healthPackageController.createHealthPackage);
router.route('/enroll').post(healthPackageController.enrollHealthPackage);
router.route('/release').post(healthPackageController.releaseHealthPackage);
router.route('/:slug').get(healthPackageController.getOneHealthPackage);
router.route('/:id').delete(healthPackageController.deleteOneHealthPackage)
router.route('/:slug').put(healthPackageController.updateOneHealthPackage)

module.exports = router;
