const BlogCategory = require('../models/BlogCategory');
const Blog = require('../models/Blog');

exports.createBlogCategory = async (req, res) => {
  try {
    await BlogCategory.create(req.body);

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
  const categories = await BlogCategory.find();

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

exports.getOneBlogCategory = async (req, res) => {
  const blogCategory = await BlogCategory.findOne({ slug: req.params.slug });

  try {
    res.status(200).json({
      status: 'success',
      blogCategory,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.updateOneBlogCategory = async (req, res) => {
  try {
    const blogCategory = await BlogCategory.findOne({ slug: req.params.slug });

    blogCategory.name = req.body.name;
    blogCategory.save();

    res.status(200).redirect('/admin/categories');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteOneBlogCategory = async (req, res) => {
  try {
    await BlogCategory.findByIdAndRemove(req.params.id);

    const healthPackage = await HealthPackage.findOne({
      blogCategory: req.params.id,
    });
    healthPackage.blogCategory = null;
    healthPackage.save();

    await Blog.deleteOne({ blogCategory: req.params.id });

    res.status(200).redirect('/admin/categories');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
