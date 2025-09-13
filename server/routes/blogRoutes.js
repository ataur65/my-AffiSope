// server/routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blog posts
router.get('/', blogController.getAllBlogPosts);

// Get all unique blog categories
router.get('/categories', blogController.getBlogCategories);

// Get recent blog posts
router.get('/recent', blogController.getRecentBlogPosts);

// Get a single blog post by slug
router.get('/:slug', blogController.getBlogPostBySlug);

// Create a new blog post
router.post('/', blogController.createBlogPost);

// Update a blog post by slug
router.put('/:slug', blogController.updateBlogPost);

// Delete a blog post by slug
router.delete('/:slug', blogController.deleteBlogPost);

module.exports = router;