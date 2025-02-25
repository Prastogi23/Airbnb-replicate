const listingSchema = require("../models/listings");
const ExpressError = require("../utils/ExpressError");
const Wrapasync = require("../utils/Wrapasync");
// API to search for properties in multiple fields (title, country, location)
const search = Wrapasync(async (req, res ,next) => {
    const { searchQuery } = req.query;

    if (!searchQuery) {
        // return res.status(400).json({ message: "Please provide a search query" });
        req.flash("error","Please provide a search query");
        return res.redirect("/");
        
    }

        // Search in title, location, or country fields using the $or operator
        const data = await listingSchema.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
                { country: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        // if(!data && data.length){

        //     return next(new ExpressError(404,"No data found")); 
        // }

        if(data.length === 0){
            req.flash("error","Listing Does Not Exits");
            return res.redirect("/");
        }
            
        // Return the search results
        res.render("index.ejs",{data , showSearchBox: true});
        

    }
);


module.exports = {search};