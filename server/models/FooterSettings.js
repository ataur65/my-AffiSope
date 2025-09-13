const mongoose = require('mongoose');

const FooterSettingsSchema = new mongoose.Schema({
  gallery: [
    {
      type: String,
    },
  ],
  newsletterText: {
    type: String,
    default: '*Subscribe to our newsletter to receive early discount offers, updates and new products info for 30% Membership discount.',
  },
  copyrightText: {
    type: String,
    default: '© 2023 All rights reserved. Made by Modeltheme.',
  },
  clientLogos: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('FooterSettings', FooterSettingsSchema);