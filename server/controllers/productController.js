// server/controllers/productController.js

const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, sortBy, page = 1, limit = 10, category, department, brand } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filtering
    if (category) {
      query.category = category;
    }

    // Department filtering
    if (department) {
      query.shopDepartment = { $regex: new RegExp(`^${department}`, 'i') };
    }

    // Brand filtering
    if (brand) {
      query.brand = brand;
    }

    // Price filtering
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    let sortOptions = { createdAt: -1 }; // Default sort by newest

    // Sorting
    if (sortBy === 'priceAsc') {
      sortOptions = { price: 1 };
    } else if (sortBy === 'priceDesc') {
      sortOptions = { price: -1 };
    } else if (sortBy === 'nameAsc') {
      sortOptions = { name: 1 };
    } else if (sortBy === 'nameDesc') {
      sortOptions = { name: -1 };
    }

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(query);

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get new arrivals (20 most recent products)
exports.getNewArrivals = async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(20);
    res.json(newArrivals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get unique brands
exports.getUniqueBrands = async (req, res) => {
  try {
    const brands = await Product.distinct('brand');
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get unique categories
exports.getUniqueCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get unique shop departments
exports.getUniqueShopDepartments = async (req, res) => {
  try {
    const shopDepartments = await Product.distinct('shopDepartment');
    res.json(shopDepartments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get sale products
exports.getSaleProducts = async (req, res) => {
  try {
    const saleProducts = await Product.find({ isSale: true });
    res.json(saleProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get top 10 most viewed products (simulated by rating)
exports.getTopViewedProducts = async (req, res) => {
  try {
    const topProducts = await Product.find().sort({ rating: -1 }).limit(10);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by shop department
exports.getProductsByShopDepartment = async (req, res) => {
  try {
    const shopDepartment = req.params.shopDepartment;
    const products = await Product.find({ shopDepartment: shopDepartment });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    shortDescription: req.body.shortDescription || '',
    price: req.body.price,
    category: req.body.category,
    brand: req.body.brand, // Added brand
    shopDepartment: req.body.shopDepartment,
    image: req.body.image,
    gallery: req.body.gallery || [],
    rating: req.body.rating,
    originalPrice: req.body.originalPrice,
    isSale: req.body.isSale,
    url: req.body.url,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.body.name != null) product.name = req.body.name;
    if (req.body.description != null) product.description = req.body.description;
    if (req.body.shortDescription != null) product.shortDescription = req.body.shortDescription;
    if (req.body.price != null) product.price = req.body.price;
    if (req.body.category != null) product.category = req.body.category;
    if (req.body.brand != null) product.brand = req.body.brand; // Added brand
    if (req.body.shopDepartment != null) product.shopDepartment = req.body.shopDepartment;
    if (req.body.image != null) product.image = req.body.image;
    if (req.body.gallery != null) product.gallery = req.body.gallery;
    if (req.body.rating != null) product.rating = req.body.rating;
    if (req.body.originalPrice != null) product.originalPrice = req.body.originalPrice;
    if (req.body.isSale != null) product.isSale = req.body.isSale;
    if (req.body.url != null) product.url = req.body.url;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a brand by name
exports.deleteBrand = async (req, res) => {
  try {
    const brandToDelete = req.params.name;
    // Find all products with this brand and set their brand to null
    await Product.updateMany({ brand: brandToDelete }, { $set: { brand: null } });
    res.json({ message: `Brand '${brandToDelete}' deleted and disassociated from products.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get related products by category
exports.getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // Exclude the current product
    }).limit(5); // Limit to 5 related products

    res.json(relatedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get recent products (e.g., last 3)
exports.getRecentProducts = async (req, res) => {
  try {
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(3);
    res.json(recentProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};