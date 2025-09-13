// server/controllers/searchController.js

const Product = require('../models/Product');
const BlogPost = require('../models/BlogPost');

exports.searchAll = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search

    // Search products by name or description
    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { shortDescription: searchRegex }, // Include shortDescription in search
      ],
    });

    // Search blog posts by title or content or excerpt
    const blogPosts = await BlogPost.find({
      $or: [
        { title: searchRegex },
        { content: searchRegex },
        { excerpt: searchRegex }, // Include excerpt in search
      ],
    });

    res.json({ products, blogPosts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};