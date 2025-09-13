const Review = require('../models/Review');
const Product = require('../models/Product');

// Get all reviews for a product
exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  const review = new Review({
    product: req.body.product,
    user: req.body.user,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  try {
    const newReview = await review.save();

    // Update product rating and review count
    const reviews = await Review.find({ product: newReview.product });
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    const newRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(newReview.product, {
      rating: newRating,
      reviewCount: reviews.length,
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(400).json({ message: err.message });
  }
};