const Setting = require('../models/Setting');

exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({}); // Create a default settings document if none exists
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { productsPageHero, blogPageHero, contactPageHero } = req.body;
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({
        productsPageHero,
        blogPageHero,
        contactPageHero,
      });
    } else {
      settings.productsPageHero = productsPageHero || settings.productsPageHero;
      settings.blogPageHero = blogPageHero || settings.blogPageHero;
      settings.contactPageHero = contactPageHero || settings.contactPageHero;
      await settings.save();
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
