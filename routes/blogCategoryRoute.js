const blogCategoryController = require('../controllers/blogCategoryController');
const express = require('express');

const router = express.Router();

router.route('/').post(blogCategoryController.createBlogCategory);

module.exports = router;
