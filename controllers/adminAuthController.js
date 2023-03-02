const AdminUser = require('../models/AdminUser');

const bcrypt = require('bcrypt');

exports.createOneAdminUser = async (req, res) => {
  const adminUser = await AdminUser.create(req.body);

  res.status(201).json({
    status: 'createdAdminUser',
    adminUser,
  });
};

exports.loginOneAdminUser = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const adminUser = await AdminUser.findOne({ mail });

    if (adminUser) {
      bcrypt.compare(password, adminUser.password, (err, same) => {
        if (same) {
          req.session.adminUserID = adminUser._id
          res.status(200).redirect('/admin')
        } 
      });
    } else {
      req.flash('error', 'Mail or Password is not correct!');
      res.status(400).redirect('/admin/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'failedLogin',
      error,
    });
  }
};

exports.logoutOneAdminUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}
