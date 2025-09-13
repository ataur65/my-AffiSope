const NewsletterSubscription = require('../models/NewsletterSubscription');

// Subscribe a new email to the newsletter
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    let subscription = await NewsletterSubscription.findOne({ email });
    if (subscription) {
      return res.status(409).json({ message: 'Email already subscribed' });
    }

    subscription = new NewsletterSubscription({ email });
    await subscription.save();

    res.status(201).json({ message: 'Subscription successful!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all newsletter subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await NewsletterSubscription.find();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a newsletter subscription by ID
exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await NewsletterSubscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    await subscription.deleteOne();
    res.json({ message: 'Subscription deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};