const Category = require('../models/Category');
const Product = require('../models/Product');

// Get all categories with their images
exports.getAllCategories = async (req, res) => {
  try {
    const productCategories = await Product.distinct('category');
    const categoriesWithImages = await Category.find();

    const imageMap = categoriesWithImages.reduce((map, cat) => {
      map[cat.name] = cat.imageUrl;
      return map;
    }, {});

    const allCategories = productCategories
      .filter(name => name) // Filter out null or empty string category names
      .map(name => ({
        name,
        imageUrl: imageMap[name] || null,
      }));

    res.json(allCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upsert a category image
exports.upsertCategoryImage = async (req, res) => {
  const { name, imageUrl } = req.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { name },
      { imageUrl },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a category image
exports.deleteCategoryImage = async (req, res) => {
  console.log('Deleting category image for:', req.params.name);
  try {
    const category = await Category.findOne({ name: req.params.name });
    console.log('Found category:', category);
    if (category) {
      category.imageUrl = null;
      await category.save();
    }
    res.json({ message: 'Category image deleted' });
  } catch (err) {
    console.error('Error deleting category image:', err);
    res.status(500).json({ message: err.message });
  }
};