const Blog = require('../models/Blog');
const Category = require('../models/Category');
const fs = require('fs');

exports.createBlog = async (req, res) => {
  try {
    const uploadDir = 'public/blogsUpload';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/blogsUpload/' + uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
      await Blog.create({
        ...req.body,
        image: '/blogsUpload/' + uploadImage.name,
      });

      res.status(201).redirect('/admin/blogs');
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
    console.log(error);
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const categorySlug = req.query.categories;

    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    const blogs = await Blog.find(filter)
      .sort('-createdDate')
      .populate('category');
    const categories = await Category.find();

    res.status(200).render('site/blogs', {
      pageName: 'blogs',
      categories,
      blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('category');

    const blogs = await Blog.find().populate('category');

    res.status(200).render('site/blogDetail', {
      pageName: 'blogDetail',
      blog,
      blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteOneBlog = async (req, res) => {
  try {

    const blog = await Blog.findOne({ _id: req.params.id });

    let uploadImage = blog.image;
    let uploadPath = __dirname + '/../public/' + uploadImage;

    fs.unlink(uploadPath, (err) => {
      if (err) throw err;
    });

    await Blog.findByIdAndRemove(req.params.id);

    res.status(200).redirect('/admin/blogs');

  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.updateOneBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    blog.title = req.body.title;
    blog.category = req.body.category;
    blog.description = req.body.description;
    blog.save();

    res.status(200).redirect('/admin/blogs');
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
