const express = require("express");

const router = express.Router();

const {review} = require("../controllers/reviewdata");

const {listing} = require("../controllers/list");

const {data} =require("../controllers/showdata");

const {newdata , adddata} = require("../controllers/newdata");

const {edit , updatedata} = require("../controllers/editdata");

const {deletedata , deletereview} = require("../controllers/deletedata");

const {search} = require("../controllers/search");
const {validationListing , validationreview} = require("../controllers/validation");

const {demouser} = require("../controllers/demouser");

const {signup , userdata} = require("../controllers/signup");

const {login , authenticate, loginuser , logout} = require("../controllers/login");

const {isLogIn , saveRedirectUrl , isowner , isreviewowner} = require("../middelware/middleware");

router.route("/").get(listing);

router.route("/show/:id").get(data);



router.route("/new").get(isLogIn,newdata);
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const {storage } = require("../cloudnary_connect");
const upload = multer({storage});



router.route("/listing")
.post( isLogIn,upload.single('listing[image]'),validationListing ,adddata);



router.route("/edit/:id").get(isLogIn,isowner,edit);


router.route("/edit/:id").put(isLogIn,isowner,upload.single('edit[image]'),validationListing , updatedata);

router.route("/delete/:id").delete(isLogIn,isowner,deletedata);

router.route("/search").get(search);

router.route("/show/:id").post(isLogIn,validationreview,review);

router.route("/show/:id/review/:reviewid").delete(isLogIn,isreviewowner,deletereview);

router.route("/signup").get(signup);

router.route("/signup/data").post(userdata);


router.route("/login").get(login);

router.route("/login/data").post(saveRedirectUrl,authenticate,loginuser);

router.route("/logout").get(logout);

router.route("/demouser").get(demouser);

 module.exports = router;