module.exports = (req, res, next) => {
  if (req.session.adminUserID) {
    return res.redirect('/admin');
  }
  next();
};
