const express = require('express');
const router = express.Router();
const contactSettingsController = require('../controllers/contactSettingsController');

router.get('/', contactSettingsController.getContactSettings);
router.post('/', contactSettingsController.updateContactSettings);

module.exports = router;