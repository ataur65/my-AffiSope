
const mongoose = require('mongoose');

const SocialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('SocialLink', SocialLinkSchema);
