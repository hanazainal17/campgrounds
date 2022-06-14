const express = require('express');
const router = express.Router({mergeParams: true}); //router separate params so use merge
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/expressError');
const Campground = require('../models/camps'); //connects models
const Review = require('../models/review');
const reviews = require('../controllers/reviewsController');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;