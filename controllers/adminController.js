const User = require('../models/User');
const Category = require('../models/Category');
const Tour = require('../models/Tour');
const Hotel = require('../models/Hotel');
const HealthPackage = require('../models/HealthPackage');
const Blog = require('../models/Blog');
const Faq = require('../models/Faq');

const AdminUser = require('../models/AdminUser');

exports.getAdminPage = async (req, res) => {
  const adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });

  const categories = await Category.find();

  console.log('admin -> ', req.session.adminUserID);
  const healthPackages = await HealthPackage.find()
    .populate('category')
    .populate('hotel')
    .populate('user');

  res.status(200).render('admin/index', {
    pageName: 'adminIndex',
    healthPackages,
    adminUser,
    categories,
  });
};

exports.getAdminCategoriesPage = async (req, res) => {
  const adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });

  const categories = await Category.find();

  res.status(200).render('admin/categories', {
    pageName: 'adminCategories',
    categories,
    adminUser,
  });
};

exports.getAdminCompaniesPage = async (req, res) => {
  const adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });

  const companies = await User.find({ role: 'Company' });

  const users = await User.find();

  res.status(200).render('admin/companies', {
    pageName: 'adminCompanies',
    companies,
    adminUser,
    users,
  });
};

exports.getAdminHotelsPage = async (req, res) => {
  const adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });

  const hotels = await Hotel.find();

  res.status(200).render('admin/hotels', {
    pageName: 'adminHotels',
    hotels,
    adminUser,
  });
};

exports.getAdminToursPage = async (req, res) => {
  const adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });

  const tours = await Tour.find();

  res.status(200).render('admin/tours', {
    pageName: 'adminTours',
    tours,
    adminUser,
  });
};

exports.getAdminLoginPage = async (req, res) => {
  res.status(200).render('admin/login', {
    pageName: 'adminLogin',
  });
};

exports.getAdminCustomersPage = async (req, res) => {
  const adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });

  const customers = await User.find({ role: 'Customer' });

  const users = await User.find();

  res.status(200).render('admin/customers', {
    pageName: 'adminCustomers',
    customers,
    adminUser,
    users,
  });
};

exports.getAdminFaqsPage = async (req, res) => {
  const adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });

  const faqs = await Faq.find();

  res.status(200).render('admin/faqs', {
    pageName: 'adminFaqs',
    faqs,
    adminUser,
  });
};

exports.getAdminBlogsPage = async (req, res) => {
  const adminUser = await AdminUser.findOne({ _id: req.session.adminUserID });

  const blogs = await Blog.find().populate('category');
  const categories = await Category.find();

  res.status(200).render('admin/blogs', {
    pageName: 'adminBlogs',
    blogs,
    categories,
    adminUser,
  });
};
