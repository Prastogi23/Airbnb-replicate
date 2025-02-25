const listingSchema = require("../models/listings");
const ExpressError = require("../utils/ExpressError");
const Wrapasync = require("../utils/Wrapasync");

const edit = Wrapasync(async (req,res,next) => {
    const { id } = req.params;
    
    const data = await listingSchema.findById(id);
    
    if(!data){
        req.flash("error","Listing Does Not Exits");
        res.redirect("/");  
    }
    let orginalListing = data.image.url;
    orginalListing = orginalListing.replace("/upload","/upload/w_250");
    res.render("edit.ejs",{data , orginalListing });
});

const updatedata = Wrapasync(async (req,res,next) => {
    // if(!req.body.edit){
    //     throw new ExpressError(400,"Enter the valid data");
    // }

    const { id } = req.params;
   
    const listing = await listingSchema.findByIdAndUpdate(id,req.body.edit);
    if(req.file)
        {
            listing.image.url = req.file.path;
            listing.image.filename = req.file.filename;
            await listing.save();
        }
    req.flash("success","Listing Edit Successfully");
    res.redirect(`/show/${id}`);
});


module.exports={edit , updatedata};