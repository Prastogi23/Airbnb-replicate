const listingSchema = require("../models/listings");
const Wrapasync = require("../utils/Wrapasync");
const listing = Wrapasync(async (req,res,next) =>{
    const data = await listingSchema.find({});
    res.render("index.ejs",{data , showSearchBox: true});
});



module.exports = {listing};
