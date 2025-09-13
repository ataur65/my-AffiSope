const router = require('express').Router();
const { getSettings, updateSettings, deleteClientLogo } = require('../controllers/themeSettingsController');

// Get settings
router.get('/', getSettings);

// Update settings
router.put('/', updateSettings);

// Delete a client logo
router.delete('/logos/:id', deleteClientLogo);

module.exports = router;