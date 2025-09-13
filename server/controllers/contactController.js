const Contact = require('../models/Contact');

// Create a new contact submission
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all contact submissions
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a contact submission by ID
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.deleteOne();
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
