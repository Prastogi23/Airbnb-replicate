const mongoose = require("mongoose");
const passportlocalmangoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
})

userSchema.plugin(passportlocalmangoose);


module.exports = mongoose.model("user",userSchema);