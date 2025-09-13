const mongoose = require('mongoose');

const MegaDiscountSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
});

module.exports = mongoose.model('MegaDiscount', MegaDiscountSchema);
