
const express = require('express');
const router = express.Router();
const { getAllCategories, upsertCategoryImage, deleteCategoryImage } = require('../controllers/categoriesController');

// Get all categories
router.get('/', getAllCategories);

// Upsert a category image
router.post('/', upsertCategoryImage);

// Delete a category image by name
router.delete('/:name', deleteCategoryImage);

module.exports = router;
