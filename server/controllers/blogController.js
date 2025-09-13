// server/controllers/blogController.js

const BlogPost = require('../models/BlogPost');

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 6 } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filtering
    if (category) {
      query.category = category;
    }

    const blogPosts = await BlogPost.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalBlogPosts = await BlogPost.countDocuments(query);

    res.json({
      blogPosts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalBlogPosts / limit),
      totalBlogPosts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single blog post by slug
exports.getBlogPostBySlug = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOne({ slug: req.params.slug });
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blogPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  console.log('Creating blog post with body:', req.body);
  let slug = slugify(req.body.title);
  let existingPost = await BlogPost.findOne({ slug: slug });
  if (existingPost) {
    slug = `${slug}-${Date.now()}`;
  }

  const blogPost = new BlogPost({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: req.body.date,
    slug: slug,
    image: req.body.image,
    category: req.body.category,
    excerpt: req.body.excerpt,
  });

  try {
    const newBlogPost = await blogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a blog post by slug
exports.updateBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOne({ slug: req.params.slug });
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });

    if (req.body.title != null) {
      blogPost.title = req.body.title;
      let slug = slugify(req.body.title);
      let existingPost = await BlogPost.findOne({ slug: slug });
      if (existingPost && existingPost._id.toString() !== blogPost._id.toString()) {
        slug = `${slug}-${Date.now()}`;
      }
      blogPost.slug = slug;
    }

    if (req.body.content != null) blogPost.content = req.body.content;
    if (req.body.author != null) blogPost.author = req.body.author;
    if (req.body.date != null) blogPost.date = req.body.date;
    if (req.body.image != null) blogPost.image = req.body.image;
    if (req.body.category != null) blogPost.category = req.body.category;
    if (req.body.excerpt != null) blogPost.excerpt = req.body.excerpt;

    const updatedBlogPost = await blogPost.save();
    res.json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog post by slug
exports.deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findOne({ slug: req.params.slug });
    if (!blogPost) return res.status(404).json({ message: 'Blog post not found' });

    await blogPost.deleteOne();
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all unique blog categories
exports.getBlogCategories = async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get recent blog posts (e.g., last 3)
exports.getRecentBlogPosts = async (req, res) => {
  try {
    const recentPosts = await BlogPost.find().sort({ date: -1 }).limit(3);
    res.json(recentPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};