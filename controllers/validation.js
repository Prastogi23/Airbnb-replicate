const joi = require("joi");
const ExpressError = require("../utils/ExpressError");



const listingSchema = joi.object({
    listings:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        image:joi.string().allow("",null),
        price:joi.number().required(),
        location:joi.string().required(),
        country:joi.string().required()
    }).required(),
});



const reviewSchema = joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        msg:joi.string().required(),
    }).required(),
});

const validationListing = async (req,res,next) =>{
    let {error} = await listingSchema.validate(res.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,msg);
    }else{
        next();
    }
}


const validationreview = async (req,res,next) =>{
    let {error} = await reviewSchema.validate(res.body);
    if(error){
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400,msg);
    }else{
        next();
    }
}

module.exports = { validationListing , validationreview };