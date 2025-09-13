const ThemeSetting = require('../models/ThemeSetting');

// Get settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await ThemeSetting.findOne();
    if (!settings) {
      // If no settings exist, create a default one
      settings = await ThemeSetting.create({
        headerLogoUrl: '/img/placeholder.jpg',
        metaTitle: 'My Affiliate App',
        metaDescription: 'A powerful affiliate marketing platform.',
        metaLogoUrl: '/img/placeholder.jpg',
        faviconUrl: '/img/favicon.ico',
        headerSectionText: 'Welcome to our store!',
        showSearchForm: true,
        headerLogoText: 'ffiliate',
        showHeaderLogoImage: true,
        showHeaderLogoText: true,
        showMegaDiscounts: true,
        heroSlides: [], // Initialize heroSlides as an empty array
        clientLogos: [],
        customFields: [],
      });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    let settings = await ThemeSetting.findOneAndUpdate({}, updates, { new: true, upsert: true });
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a client logo
exports.deleteClientLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const settings = await ThemeSetting.findOneAndUpdate(
      {},
      { $pull: { clientLogos: { _id: id } } },
      { new: true }
    );
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};