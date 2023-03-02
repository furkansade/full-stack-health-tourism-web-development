const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const FaqSchema = new Schema({
  question: {
    type: String,
    unique: true,
    required: true,
  },
  answer: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

FaqSchema.pre('validate', function (next) {
  this.slug = slugify(this.question, {
    lower: true,
    strict: true,
  });
  next();
});

const Faq = mongoose.model('Faq', FaqSchema);

module.exports = Faq;
