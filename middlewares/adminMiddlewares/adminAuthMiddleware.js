const AdminUser = require('../../models/AdminUser');

module.exports = (req, res, next) => {
  AdminUser.findById(req.session.adminUserID, (err, adminUser) => {
    if (err || !adminUser) return res.redirect('/admin/login');
    next();
  });
};
