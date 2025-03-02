const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { // Renamed from "img" for consistency
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        },
        filename: {
            type: String,
            default: "default-image",
        },
    },
    price: { type: Number },
    location: { type: String },
    country: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    geometry: {
        type: {
            type:  String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});


const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing;
