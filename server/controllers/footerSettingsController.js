const FooterSettings = require('../models/FooterSettings');

// Get footer settings
exports.getFooterSettings = async (req, res) => {
  try {
    const settings = await FooterSettings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update footer settings
exports.updateFooterSettings = async (req, res) => {
  try {
    let settings = await FooterSettings.findOne();
    if (!settings) {
      settings = new FooterSettings(); // Initialize if not found
    }

    // Filter out empty strings from gallery and clientLogos arrays
    if (req.body.gallery) {
      req.body.gallery = req.body.gallery.filter(url => url !== '');
    }
    if (req.body.clientLogos) {
      req.body.clientLogos = req.body.clientLogos.filter(url => url !== '');
    }

    settings.set(req.body);
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
