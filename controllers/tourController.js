const Tour = require('../models/Tour');
const fs = require('fs');

exports.createTour = async (req, res) => {
  try {
    const uploadDir = 'public/toursUpload';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/toursUpload/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
      await Tour.create({
        ...req.body,
        image: '/toursUpload/' + uploadImage.name,
      });

      res.status(201).redirect('/admin/tours');
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      tours,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug });

    res.status(200).json({
      status: 'success',
      tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteOneTour = async (req, res) => {
  try {

    const tour = await Tour.findOne({ _id: req.params.id });

    let uploadImage = tour.image;
    let uploadPath = __dirname + '/../public/' + uploadImage;

    fs.unlink(uploadPath, (err) => {
      if (err) throw err;
    });

    await Tour.findByIdAndRemove(req.params.id);

    res.status(200).redirect('/admin/tours');

  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.updateOneTour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndUpdate(
      { slug: req.params.slug },
      req.body
    );

    res.status(200).json({
      status: 'success',
      tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
