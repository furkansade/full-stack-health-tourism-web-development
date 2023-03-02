const Hotel = require('../models/Hotel');
const fs = require('fs');

exports.createHotel = async (req, res) => {
  try {
    // const hotel = await Hotel.create({
    //   name: req.body.name,
    //   city: req.body.city,
    //   description: req.body.description,
    //   image: req.body.image,
    //   webUrl: req.body.webUrl
    // });

    const uploadDir = 'public/hotelsUpload';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/hotelsUpload/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
      await Hotel.create({
        ...req.body,
        user: req.session.userID,
        image: '/hotelsUpload/' + uploadImage.name,
      });

      res.status(201).redirect('/admin/hotels');
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
    console.log(error);
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json({
      status: 'success',
      hotels,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getOneHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ slug: req.params.slug });

    res.status(200).json({
      status: 'success',
      hotel,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteOneHotel = async (req, res) => {
  try {

    const hotel = await Hotel.findOne({ _id: req.params.id });

    let uploadImage = hotel.image;
    let uploadPath = __dirname + '/../public/' + uploadImage;

    fs.unlink(uploadPath, (err) => {
      if (err) throw err;
    });

    await Hotel.findByIdAndRemove(req.params.id);

    res.status(200).redirect('/admin/hotels');

  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.updateOneHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndUpdate(
      { slug: req.params.slug },
      req.body
    );

    res.status(200).json({
      status: 'success',
      hotel,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
