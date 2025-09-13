
const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  children: [{
    name: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  }],
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
