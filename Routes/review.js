const express = require("express")
const router = express.Router({ mergeParams: true })
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js")
const { validateReview, isLoggedIn, isOwner, isAuthor } = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")


//delete review route

router.delete("/:reviewId",
    isLoggedIn,
    isAuthor,
    wrapAsync(reviewController.deleteReview)
);


//reviews post

router.post("/",
    isLoggedIn,
    validateReview
    , wrapAsync(reviewController.createReview)
)

module.exports = router;