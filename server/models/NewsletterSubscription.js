const mongoose = require('mongoose');

const NewsletterSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('NewsletterSubscription', NewsletterSubscriptionSchema);