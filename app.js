if(process.env.NODE_ENV!='production'){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./DB/connectDB");
const listingroute = require("./routes/listingroute");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const user = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Import the generated JSON file

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const sessionOptions={
    secret:"Mysupersecretkey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
    },
}



app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


const methodoverride = require("method-override");
app.use(methodoverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.engine("ejs",ejsMate);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.user = req.user;
    next();
})

app.use("/",listingroute);

// app.get("/",(req,res)=>{
//     res.send("LIve");
// });

app.all("*",(req, res, next)=>{
    next(new ExpressError(404,"Page Not found"));
});

app.use((err,req,res,next)=>{
    let {status = 500 , message = "something is wrong!"} = err;
    res.render("error.ejs",{message});
    // res.status(status).send(message);
});

app.listen(8080,()=>{
    console.log("Server is listen at 8080");
});

connectDB();
