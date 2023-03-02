const HealthPackage = require('../models/HealthPackage');
const User = require('../models/User');
const Faq = require('../models/Faq');

exports.getHomePage = async (req, res) => {
  const companies = await User.find({ role: 'Company' });

  res.status(200).render('site/index', {
    pageName: 'index',
    companies,
  });
};

exports.getAboutPage = async (req, res) => {
  res.status(200).render('site/about', {
    pageName: 'about',
  });
};

exports.getCompaniesPage = async (req, res) => {
  const companies = await User.find({ role: 'Company' });

  res.status(200).render('site/companies', {
    pageName: 'companies',
    companies,
  });
};

exports.getContactPage = async (req, res) => {
  res.status(200).render('site/contact', {
    pageName: 'contact',
  });
};

exports.getRegisterPage = async (req, res) => {
  res.status(200).render('site/register', {
    pageName: 'register',
  });
};

exports.getRegisterCompanyPage = async (req, res) => {
  res.status(200).render('site/registerCompany', {
    pageName: 'registerCompany',
  });
};

exports.getLoginPage = async (req, res) => {
  res.status(200).render('site/login', {
    pageName: 'login',
  });
};

exports.getFaqsPage = async (req, res) => {
  const faqs = await Faq.find();

  res.status(200).render('site/faq', {
    pageName: 'faq',
    faqs,
  });
};

exports.getSingleCompanyPage = async (req, res) => {
  const company = await User.findOne({ slug: req.params.slug });

  const healthPackages = await HealthPackage.find()
    .populate('user')
    .populate('category');

  res.status(200).render('site/companyProfile', {
    pageName: 'company',
    company,
    healthPackages,
  });
};

exports.getNotFoundPage = async (req, res) => {
  res.status(404).render('site/404', {
    pageName: '404',
  });
};
