const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  webUrl: String,
});


HotelSchema.pre('validate', function (next) {
  infoHotel = this.name + ' ' + this.city;

  this.slug = slugify(infoHotel, {
    lower: true,
    strict: true,
  });
  next();
});

const Hotel = mongoose.model('Hotel', HotelSchema);


module.exports = Hotel;
