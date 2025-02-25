const listingSchema = require("../models/listings");
const reviewSchema = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const Wrapasync = require("../utils/Wrapasync");

const review = Wrapasync(async (req,res,next) =>{
        // console.log(req.params);
        // console.log(req.body.show);
        const  data = await listingSchema.findById(req.params.id);
        // console.log(data);
        let reviewdata = req.body.show;
        reviewdata.reviewowner = req.user._id;
        console.log("New review:",reviewdata)
        let addreview = await reviewSchema.create(reviewdata);
        console.log(addreview);
        data.reviews.push(addreview._id);
        await data.save();
        let data2 = await listingSchema.findById(req.params.id);
        console.log(data2);
        req.flash("success","New Review Added Successfully");
        res.redirect(`/show/${data._id}`);
});


module.exports = { review };