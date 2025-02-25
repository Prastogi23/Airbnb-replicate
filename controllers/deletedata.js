const listingSchema = require("../models/listings");
const Wrapasync = require("../utils/Wrapasync");
const reviewSchema = require("../models/review");


const deletedata = Wrapasync(async (req,res,next) =>{
    const { id } = req.params;
    const listing_delete = await listingSchema.findByIdAndDelete(id);
    req.flash("success","Listing Deleted Successfully");
    res.redirect("/");
});

const deletereview = Wrapasync(async (req,res,next)=>{
    let{id , reviewid} = req.params;
    await  reviewSchema.findByIdAndDelete(reviewid);
    await listingSchema.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    req.flash("success","Review Deleted Successfully");
    res.redirect(`/show/${id}`);
})

module.exports = {deletedata , deletereview};