const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
  },
  city: String,
});

CustomerSchema.pre('save', function (next) {
  const customer = this;
  if (!customer.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(customer.password, salt, function (err, hash) {
      if (err) return next(err);
      customer.password = hash;
      next();
    });
  });
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;