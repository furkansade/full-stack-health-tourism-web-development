const User = require('../models/User');
const Category = require('../models/Category');
const Tour = require('../models/Tour');
const Hotel = require('../models/Hotel');
const HealthPackage = require('../models/HealthPackage');
const fs = require('fs');

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.createOneUser = async (req, res) => {
  try {
    const uploadDir = 'public/logoUpload';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.logoImage;
    let uploadPath = __dirname + '/../public/logoUpload/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
      await User.create({
        ...req.body,
        logoImage: '/logoUpload/' + uploadImage.name,
      });

      res.status(201).redirect('/login');
    });
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }

    res.status(400).redirect('/register');
    console.log(error);
  }
};

exports.loginOneUser = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        // USER SESSION
        if (same) {
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          req.flash('error', 'Mail or Password is not correct!');
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash('error', 'Mail or Password is not correct!');
      res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
    console.log(error);
  }
};

exports.logoutOneUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID })
    .populate('role')
    .populate('healthPackages');

  const companies = await User.find({ role: 'Company' });

  const healthPackages = await HealthPackage.find({ user: req.session.userID })
    .populate('category')
    .populate('hotel');

  const categories = await Category.find();
  const hotels = await Hotel.find();
  const tours = await Tour.find();

  res.status(200).render('site/dashboard', {
    pageName: 'dashboard',
    companies,
    healthPackages,
    user,
    categories,
    hotels,
    tours,
  });
};

exports.getNewPackagePage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  const tours = await Tour.find();
  const hotels = await Hotel.find();

  res.status(200).render('site/newHealthPackage', {
    pageName: 'newHealthPackage',
    user,
    categories,
    tours,
    hotels,
  });
};

exports.deleteOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    let uploadImage = user.logoImage;
    let uploadPath = __dirname + '/../public/' + uploadImage;

    fs.unlink(uploadPath, (err) => {
      if (err) res.redirect("/admin");
    });

    await User.findByIdAndRemove(req.params.id);
    await HealthPackage.deleteOne({ user: req.params.id });

    res.status(200).redirect('/admin/companies');

  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
