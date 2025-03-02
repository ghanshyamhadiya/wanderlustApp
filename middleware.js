
const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const {reviewSchema} = require("./schema.js")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //redirect Url
        req.session.redirectUrl = req.originalUrl
        let redirectUrl = req.session.redirectUrl
        

        req.flash("error", "First you need to logged in before update or create")
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Requested Listing doesn't exist!");
        return res.redirect("/listing");
    }
    if (!listing.owner._id.equals(req.user._id)) { // Fixed req.owner → req.user
        req.flash("error", "You don't have permission to change things");
        return res.redirect("/listing");
    }
    next()
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next(); 
    }
};

module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
}

 
module.exports.isAuthor = async (req, res, next) => {
    
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Requested Listing doesn't exist!");
        return res.redirect("/listing");
    }
    if (!review.author._id.equals(req.user._id)) {
        req.flash("error", "you are not author of review");
        return res.redirect(`/listing/${id}`);
    }
    next()
}