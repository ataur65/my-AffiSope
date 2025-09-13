
const express = require('express');
const {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} = require('../controllers/socialLinksController');

const router = express.Router();

router.route('/').get(getSocialLinks).post(createSocialLink);

router.route('/:id').put(updateSocialLink).delete(deleteSocialLink);

module.exports = router;
