const mongoose = require('mongoose');
const slugify = require('slugify');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  packages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthPackage',
    },
  ],
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  webUrl: {
    type: String,
    unique: true,
  },
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
  ],
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  logoImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

CompanySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

CompanySchema.pre('save', function (next) {
  const company = this;
  if (!company.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(company.password, salt, function (err, hash) {
      if (err) return next(err);
      company.password = hash;
      next();
    });
  });
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
