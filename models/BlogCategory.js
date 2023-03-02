const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const BlogCategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

BlogCategorySchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const BlogCategory = mongoose.model('BlogCategory', BlogCategorySchema);

module.exports = BlogCategory;
