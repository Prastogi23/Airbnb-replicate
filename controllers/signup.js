const user = require("../models/user");
const Wrapasync = require("../utils/Wrapasync");

const signup = Wrapasync(async (req,res,next)=>{
    res.render("signup.ejs");
});

const userdata = Wrapasync(async (req,res,next)=>{
    try {
        const newuser = await user.register(req.body.data,req.body.password);
        req.login(newuser,(err)=>{
            if(err){
                return next(err);
            }else{
                req.flash("success","Successfully Register");
                let redirect = res.locals.redirectUrl || "/"
                console.log(redirect);
                res.redirect(redirect);
                // res.redirect("/");
            }
        })
        
    } catch (error) {
        req.flash("error","User is already Register");
        res.redirect("/signup");
    }
    // console.log(req.body.data,req.body.password);
   
})

module.exports = {signup , userdata};
