const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

BlogSchema.pre('validate', function (next) {
  
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
