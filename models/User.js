const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Customer', 'Company', 'Admin'],
    default: 'Company',
  },
  slug: {
    type: String,
    unique: true,
  },
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
    lower: true,
  },
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
    // required: true,
  },
  healthPackages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthPackage',
    },
  ],
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const User = mongoose.model('User', UserSchema); //converToModel//

module.exports = User;
