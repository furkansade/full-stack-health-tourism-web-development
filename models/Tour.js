const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const TourSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  guide: String,
});


TourSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;
