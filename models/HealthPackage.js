const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const HealthPackageSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  warningInfo: String,
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: 'CategoryOne',
  },
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  doctorUrl: String,
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
  },
  oldPrice: {
    type: Number,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

HealthPackageSchema.pre('validate', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});

const HealthPackage = mongoose.model('HealthPackage', HealthPackageSchema);

module.exports = HealthPackage;
