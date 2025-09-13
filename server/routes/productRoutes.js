// server/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get new arrivals
router.get('/new-arrivals', productController.getNewArrivals);

// Get sale products
router.get('/sale', productController.getSaleProducts);

// Get top viewed products
router.get('/top-viewed', productController.getTopViewedProducts);

// Get recent products
router.get('/recent', productController.getRecentProducts);

// Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// Get unique categories
router.get('/categories', productController.getUniqueCategories);

// Get unique brands
router.get('/brands', productController.getUniqueBrands);

// Get unique shop departments
router.get('/shopDepartments', productController.getUniqueShopDepartments);

// Get products by shop department
router.get('/shopDepartment/:shopDepartment', productController.getProductsByShopDepartment);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Create a new product
router.post('/', productController.createProduct);

// Update a product by ID
router.put('/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Delete a brand by name
router.delete('/brands/:name', productController.deleteBrand);

// Get related products
router.get('/:id/related', productController.getRelatedProducts);

module.exports = router;