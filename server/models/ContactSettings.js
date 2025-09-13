const mongoose = require('mongoose');

const contactSettingsSchema = new mongoose.Schema({
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
});

module.exports = mongoose.model('ContactSettings', contactSettingsSchema);