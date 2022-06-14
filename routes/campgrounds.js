const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgroundsController')
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/camps'); //connects models
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCamp));

router.get('/new', isLoggedIn, campgrounds.newCampForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCamp))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampForm))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

router.get ('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCampForm));





module.exports = router;