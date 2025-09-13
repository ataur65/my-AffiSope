const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// Subscribe to newsletter
router.post('/subscribe', newsletterController.subscribeNewsletter);

// Get all subscriptions
router.get('/', newsletterController.getAllSubscriptions);

// Delete a subscription
router.delete('/:id', newsletterController.deleteSubscription);

module.exports = router;