// server/controllers/megaDiscountsController.js

const MegaDiscount = require('../models/MegaDiscount');

// Get all mega discounts
exports.getAllMegaDiscounts = async (req, res) => {
  try {
    const megaDiscounts = await MegaDiscount.find();
    res.json(megaDiscounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single mega discount by ID
exports.getMegaDiscountById = async (req, res) => {
  try {
    const megaDiscount = await MegaDiscount.findById(req.params.id);
    if (!megaDiscount) return res.status(404).json({ message: 'Mega discount not found' });
    res.json(megaDiscount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new mega discount
exports.createMegaDiscount = async (req, res) => {
  const megaDiscount = new MegaDiscount({
    title: req.body.title,
    subtitle: req.body.subtitle,
    image: req.body.image,
    buttonText: req.body.buttonText,
    buttonLink: req.body.buttonLink,
  });

  try {
    const newMegaDiscount = await megaDiscount.save();
    res.status(201).json(newMegaDiscount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a mega discount by ID
exports.updateMegaDiscount = async (req, res) => {
  try {
    const megaDiscount = await MegaDiscount.findById(req.params.id);
    if (!megaDiscount) return res.status(404).json({ message: 'Mega discount not found' });

    if (req.body.title != null) megaDiscount.title = req.body.title;
    if (req.body.subtitle != null) megaDiscount.subtitle = req.body.subtitle;
    if (req.body.image != null) megaDiscount.image = req.body.image;
    if (req.body.buttonText != null) megaDiscount.buttonText = req.body.buttonText;
    if (req.body.buttonLink != null) megaDiscount.buttonLink = req.body.buttonLink;

    const updatedMegaDiscount = await megaDiscount.save();
    res.json(updatedMegaDiscount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a mega discount by ID
exports.deleteMegaDiscount = async (req, res) => {
  try {
    const megaDiscount = await MegaDiscount.findById(req.params.id);
    if (!megaDiscount) return res.status(404).json({ message: 'Mega discount not found' });

    await megaDiscount.deleteOne();
    res.json({ message: 'Mega discount deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
