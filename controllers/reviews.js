const Listing = require("../models/listing.js")
const Review = require("../models/review.js");


module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("error", "Review deleted")

    res.redirect(`/listing/${id}`);
}

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)
    newReview.author = req.user._id
    listing.reviews.push(newReview)
    
    await newReview.save()
    await listing.save()

    
    req.flash("success", "Your experience added")
    res.redirect(`/listing/${listing._id}`)
}