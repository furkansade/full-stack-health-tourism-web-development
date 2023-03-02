const Company = require('../models/Company');


exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      status: 'success',
      company,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json({
      status: 'success',
      companies,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getOneCompany = async (req, res) => {
  
  try {
    const company = await Company.findOne({ slug: req.params.slug });
    
    res.status(200).json({
      status: 'success',
      company,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndRemove(req.params.id);

    res.status(200).redirect('/admin/companies')
    
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { slug: req.params.slug },
      req.body
    );

    res.status(200).json({
      status: 'success',
      company,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
