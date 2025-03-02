const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControl = require("../controllers/listing.js")

const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const Upload = multer({ storage: storage });



router
    .route("/")
    // Main Route
    .get(wrapAsync(listingControl.index))
    // Create Route
    .post(
        isLoggedIn,
        Upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingControl.createRoute));


// New Listing Form
router.get("/new", isLoggedIn, listingControl.newGetRoute);


router
    .route("/:id")
    // Edit Route
    .put(
        isLoggedIn,
        isOwner,
        Upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingControl.editPutRoute)
    )
    // Show Route
    .get(wrapAsync(listingControl.showRoute))
    // Delete Route
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingControl.deleteRoute)
    )



// Edit Form Route
router.get(
    "/:id/edit",
    isLoggedIn,
    wrapAsync(listingControl.editGetRoute)
);


module.exports = router;