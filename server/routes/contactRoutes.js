const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST a new contact submission
router.post('/', contactController.createContact);

// GET all contact submissions
router.get('/', contactController.getContacts);

// DELETE a contact submission by ID
router.delete('/:id', contactController.deleteContact);

module.exports = router;
