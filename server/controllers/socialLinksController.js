
const SocialLink = require('../models/SocialLink');

// @desc    Get all social links
// @route   GET /api/sociallinks
// @access  Public
exports.getSocialLinks = async (req, res, next) => {
  try {
    const socialLinks = await SocialLink.find();

    res.status(200).json({
      success: true,
      data: socialLinks,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new social link
// @route   POST /api/sociallinks
// @access  Private
exports.createSocialLink = async (req, res, next) => {
  try {
    const socialLink = await SocialLink.create(req.body);

    res.status(201).json({
      success: true,
      data: socialLink,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new social link
// @route   POST /api/sociallinks
// @access  Private
exports.createSocialLink = async (req, res, next) => {
  try {
    const socialLink = await SocialLink.create(req.body);

    res.status(201).json({
      success: true,
      data: socialLink,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Update social link
// @route   PUT /api/sociallinks/:id
// @access  Private
exports.updateSocialLink = async (req, res, next) => {
  try {
    const socialLink = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!socialLink) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: socialLink });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete social link
// @route   DELETE /api/sociallinks/:id
// @access  Private
exports.deleteSocialLink = async (req, res, next) => {
  try {
    const socialLink = await SocialLink.findByIdAndDelete(req.params.id);

    if (!socialLink) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
