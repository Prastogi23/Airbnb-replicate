const listingSchema = require("../models/listings");
const ExpressError = require("../utils/ExpressError");
const Wrapasync = require("../utils/Wrapasync");
// const {geocoding} = require("./geocoding");


const newdata = Wrapasync(async (req,res,next) => {
    res.render("newlisting.ejs");
});



const adddata = Wrapasync(async (req,res,next) => {
    
    const data = new listingSchema (req.body.listing);
    console.log(req.file);
        data.image.url = req.file.path;
        data.image.filename = req.file.filename;
        data.owner = req.user._id;
        console.log(data.location);
        // const geocode = await geocoding(data.location);
        // if(geocode){
        // data.geometry.coordinates = geocode;}
        let result = await data.save();
        console.log(result);
        req.flash("success","New Listing Added Successfully");
        res.redirect("/");
        //console.log('Image uploaded to Cloudinary:', req.file);
        //res.status(200).json(req.file); // Return the uploaded file info
 
});

module.exports = {newdata , adddata};