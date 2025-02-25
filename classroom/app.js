const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const ejsMate = require("ejs-mate");
const { error } = require("console");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const sessionOption = {secret:"mysecretcode",
     resave:false , 
    saveUninitialized:true};

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.message = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name=name;
    if (name === "anonymous"){
    req.flash("error","user not registered");
    }
    else{
    req.flash("success","user register successfully");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    // res.locals.message = req.flash("success");
    // res.locals.error = req.flash("error");
    res.render("page.ejs",{name:req.session.name });
})





// app.get("/test",(req,res)=>{
//     res.send("test successful");
// })

// app.get("/request",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
// //     }
//     res.send(`our request count is ${req.session.count}`);
// })










//Cookies session

// const cookieparser = require("cookie-parser");

// app.use(cookieparser("Secretcode"));

// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("made-in","India" ,{ signed:true });
//     res.send("signed cookie is sended");
// })


// app.get("/verify",(req,res)=>{
//     console.dir(req.signedCookies);
//     res.send("Verification");
// })


// app.get("/greet",(req,res)=>{
//     let {name = "anonymous" } = req.cookies;
//     res.send(`hi,${name}`);
// })


// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("I am a root node");
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.cookie("made_in","india");
//     res.send("Cookies sended");
// })



app.listen(3000,()=>{
    console.log("Server is listen at 3000");
})


