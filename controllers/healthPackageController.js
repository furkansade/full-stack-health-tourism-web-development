const Category = require('../models/Category');
const HealthPackage = require('../models/HealthPackage');
const User = require('../models/User');

const fs = require('fs');

exports.createHealthPackage = async (req, res) => {
  try {
    // const healthPackage = await HealthPackage.create({
    //   title: req.body.title,
    //   warningInfo: req.body.warningInfo,
    //   description: req.body.description,
    //   category: req.body.category,
    //   image: req.body.image,
    //   company: req.body.company,
    //   doctor: req.body.doctor,
    //   hotel: req.body.hotel,
    //   price: req.body.price,
    //   tour: req.body.tour,
    // });

    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
      await HealthPackage.create({
        ...req.body,
        user: req.session.userID,
        image: '/uploads/' + uploadImage.name,
      });

      req.flash('success', 'Created new package!');

      res.status(201).redirect('/users/dashboard');
    });
  } catch (error) {
    req.flash('error', 'Something happened!');
    res.status(400).redirect('/users/dashboard');
  }
};

exports.getAllHealthPackages = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    const query = req.query.search

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    if(query) {
      filter = {title: query}
    }

    if (!query && !categorySlug) {
      (filter.title = ''), (filter.category = null);
    }

    const healthPackages = await HealthPackage.find({
      $or: [
        { title: { $regex: '.*' + filter.title + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdDate')
      .populate('company')
      .populate('category')
      .populate('user');

    const categories = await Category.find();

    const companies = await User.find({ role: 'Company' });

   
    res.status(200).render('site/healthpackages', {
      pageName: 'healthpackages',
      healthPackages,
      categories,
      companies,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getOneHealthPackage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const healthPackages = await HealthPackage.find().populate('category');

    const healthPackage = await HealthPackage.findOne({ slug: req.params.slug })
      .populate('category')
      .populate('company')
      .populate('hotel')
      .populate('tour')
      .populate('user');

    res.status(200).render('site/healthpackagedetail', {
      pageName: 'healthpackagedetail',
      healthPackage,
      healthPackages,
      user,
    });
    console.log(healthPackage.image);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.enrollHealthPackage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.healthPackages.push({ _id: req.body.healthPackage_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
    console.log(error);
  }
};

exports.releaseHealthPackage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.healthPackages.pull({ _id: req.body.healthPackage_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.updateOneHealthPackage = async (req, res) => {
  try {
    const healthPackage = await HealthPackage.findOne({
      slug: req.params.slug,
    });

    healthPackage.title = req.body.title;
    healthPackage.description = req.body.description;
    healthPackage.newPrice = req.body.newPrice;
    healthPackage.doctorUrl = req.body.doctorUrl;
    healthPackage.category = req.body.category;
    healthPackage.hotel = req.body.hotel;
    healthPackage.tour = req.body.tour;
    healthPackage.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
    console.log(error);
  }
};

exports.deleteOneHealthPackage = async (req, res) => {
  try {
    const healthPackage = await HealthPackage.findOne({ _id: req.params.id });

    let uploadImage = healthPackage.image;
    let uploadPath = __dirname + '/../public/' + uploadImage;

    fs.unlink(uploadPath, (err) => {
      if (err) throw err;
      else console.log('deleted photo!');
    });

    await HealthPackage.findByIdAndRemove(req.params.id);




    req.flash('error', 'Deleted health package!');
    res.status(200).redirect('/healthpackages');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
