const  passport = require("passport");
const user = require("../models/user");
const Wrapasync = require("../utils/Wrapasync");

const login = Wrapasync(async (req,res,next)=>{
    res.render("login.ejs");
});

const authenticate = passport.authenticate("local",{failureRedirect:"/login",failureFlash:true});

const loginuser = Wrapasync(async (req,res,next) =>{
    req.flash("success","Welcome to WnaderLust");
    let redirect = res.locals.redirectUrl || "/"
    res.redirect(redirect);
})

const logout = Wrapasync(async (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","Logout Successfully");
    res.redirect("/");
    })
})


module.exports = {login , authenticate ,loginuser , logout};