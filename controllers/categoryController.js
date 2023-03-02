const Category = require('../models/Category');
const HealthPackage = require('../models/HealthPackage');
const Blog = require('../models/Blog');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).redirect('/admin/categories');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
    console.log(error);
  }
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();

  try {
    res.status(201).json({
      status: 'success',
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getOneCategory = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });

  try {
    res.status(200).json({
      status: 'success',
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.updateOneCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    category.name = req.body.name;
    category.save();

    res.status(200).redirect('/admin/categories');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteOneCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);

    const healthPackage = await HealthPackage.findOne({
      category: req.params.id,
    });
    healthPackage.category = null;
    healthPackage.save();

    await Blog.deleteOne({ category: req.params.id });

    res.status(200).redirect('/admin/categories');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
