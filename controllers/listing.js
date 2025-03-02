const { query } = require("express");
const Listing = require("../models/listing.js");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN

const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("./listings/index.ejs", { allListing });
}

module.exports.editPutRoute = async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename
        listing.image = { url, filename }
        await listing.save()
    }
    req.flash("update", "Listing updated");
    res.redirect(`/listing/${id}`);
}



module.exports.editGetRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Requested Listing doesn't exist!");
        return res.redirect("/listing");
    }
    let originalImage = listing.image.url;
    originalImage.replace("/upload", "/upload/h_300,w_250")
    if (!listing.owner._id.equals(req.user._id)) { // Fixed req.owner → req.user
        req.flash("error", "You don't have permission to edit");
        return res.redirect("/listing");
    }
    res.render("./listings/edit.ejs", { listing, originalImage });
}

module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Requested Listing doesn't exist!");
        return res.redirect("/listing");
    }
    // Add owner check
    if (!listing.owner._id.equals(req.user._id)) {
        req.flash("error", "You don't have permission to delete");
        return res.redirect("/listing");
    }
    await Listing.findByIdAndDelete(id);
    req.flash("error", "Listing Deleted");
    res.redirect("/listing");
}

module.exports.createRoute = async (req, res) => {

    let response = await geocodingClient
    .forwardGeocode({
        query: req.body.listing.location,
        limit: 2,
    })
        .send()
        

    let url = req.file.path
    let filename = req.file.filename
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = { url, filename }
    newListing.geometry = response.body.features[0].geometry;


    let saveListed = await newListing.save();
    console.log(saveListed);
    
    req.flash("success", "New listing created");
    res.redirect("/listing");
}

module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Requested Listing doesn't exist!");
        return res.redirect("/listing");
    }


    res.render("./listings/show.ejs", { listing });
}

module.exports.newGetRoute = (req, res) => {
    res.render("./listings/new.ejs");
}