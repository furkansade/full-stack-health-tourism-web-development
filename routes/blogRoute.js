const blogController = require('../controllers/blogController');
const express = require('express');


const router = express.Router();

router.route('/').post(blogController.createBlog);
router.route('/').get(blogController.getAllBlogs);
router.route('/:slug').get(blogController.getOneBlog);
router.route('/:id').delete(blogController.deleteOneBlog);
router.route('/:id').put(blogController.updateOneBlog);

module.exports = router;
