const express = require('express');
const router = express.Router();
const footerSettingsController = require('../controllers/footerSettingsController');

// Get footer settings
router.get('/', footerSettingsController.getFooterSettings);

// Update footer settings
router.put('/', footerSettingsController.updateFooterSettings);

module.exports = router;