const mongoose = require('mongoose');
const Review = require("./reviews");
const User = require("../models/users");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ]
});

CampgroundSchema.post("findOneAndDelete" , async function (campground) {
    for (let reviewId of campground.reviews) {
        await Review.findByIdAndDelete(reviewId);
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);