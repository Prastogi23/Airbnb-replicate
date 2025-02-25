const Wrapasync = require("../utils/Wrapasync");
const listingSchema = require("../models/listings");
const reviewSchema = require("../models/review");

const isLogIn = Wrapasync( async (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirect = req.originalUrl;
        req.flash("error","You must be login");
        res.redirect("/login");
    }
    next();
}); 


const saveRedirectUrl = Wrapasync( async (req,res,next) =>{
    if(req.session.redirect){
        res.locals.redirectUrl = req.session.redirect  
    }
    next();
})


const isowner = Wrapasync( async (req,res,next) =>{
    let {id} = req.params; 
    let data = await listingSchema.findById(id);
    if(res.locals.user && !data.owner.equals(res.locals.user._id)){
        req.flash("error","Permission Denied");
        return res.redirect("/show/"+data.id);
    }
    next();
})



const isreviewowner = Wrapasync( async (req,res,next) =>{
    let{id , reviewid} = req.params; 
    const data = await reviewSchema.findById(reviewid);

    if (!data) {
                req.flash("error", "Review not found.");
                return res.redirect(`/show/${id}`); // Redirect to the listing if review not found
            }

    if(res.locals.user && !data.reviewowner.equals(res.locals.user._id)){
        req.flash("error","Permission Denied");
        return res.redirect(`/show/${id}`);
    }
    next();
})

module.exports = {isLogIn , saveRedirectUrl ,isowner , isreviewowner};