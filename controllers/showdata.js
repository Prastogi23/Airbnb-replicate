const listingSchema = require("../models/listings");
const Wrapasync = require("../utils/Wrapasync");
const {geocoding} = require("./geocoding");

const data = Wrapasync(async (req,res,next) =>{
    const { id } = req.params;
    const data = await listingSchema.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"reviewowner",
            select:"username"
        }
    })
    .populate("owner");
    // if(data.geometry.coordinates.length==0){
    // const geocode = await geocoding(data.location);
    // if(geocode){
    // data.geometry.coordinates = geocode;}
    // }
    console.log(data);
    if(!data){
        req.flash("error","Listing Does Not Exits");
        res.redirect("/")  
    }
    res.render("show.ejs",{data , map:true});
});

module.exports = {data};