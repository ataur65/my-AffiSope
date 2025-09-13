// server/routes/megaDiscountsRoutes.js

const express = require('express');
const router = express.Router();
const megaDiscountsController = require('../controllers/megaDiscountsController');

// Get all mega discounts
router.get('/', megaDiscountsController.getAllMegaDiscounts);

// Get a single mega discount by ID
router.get('/:id', megaDiscountsController.getMegaDiscountById);

// Create a new mega discount
router.post('/', megaDiscountsController.createMegaDiscount);

// Update a mega discount by ID
router.put('/:id', megaDiscountsController.updateMegaDiscount);

// Delete a mega discount by ID
router.delete('/:id', megaDiscountsController.deleteMegaDiscount);

module.exports = router;
