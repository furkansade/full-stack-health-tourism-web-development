const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const User = require('../models/User')

const { body } = require('express-validator');
const express = require('express');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Name is required!'),


    body('mail').not().isEmpty().withMessage('Mail is required!').custom((userMail)=>{
      return User.findOne({mail:userMail}).then(user => {
        if(user) {
          return Promise.reject("Mail is already exist!")
        }
      })
    }),


    body('password').not().isEmpty().withMessage('Password is required!')


  ],
  authController.createOneUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/login').post(authController.loginOneUser);
router.route('/logout').get(authController.logoutOneUser);
router.route('/new-package').get(authMiddleware, authController.getNewPackagePage);
router.route('/:id').delete(authController.deleteOneUser);



module.exports = router;
