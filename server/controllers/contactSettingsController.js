const ContactSettings = require('../models/ContactSettings');

exports.getContactSettings = async (req, res) => {
  try {
    const settings = await ContactSettings.findOne();
    if (!settings) {
      // If no settings exist, create a new one with default values
      const newSettings = new ContactSettings();
      await newSettings.save();
      return res.json(newSettings);
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact settings', error });
  }
};

exports.updateContactSettings = async (req, res) => {
  try {
    const { address, phone, email } = req.body;
    let settings = await ContactSettings.findOne();
    if (!settings) {
      settings = new ContactSettings();
    }
    settings.address = address;
    settings.phone = phone;
    settings.email = email;
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact settings', error });
  }
};