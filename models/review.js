const { required } = require("joi");
const { default: mongoose, Schema } = require("mongoose");
const { review } = require("../controllers/reviewdata");



const reviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    reviewowner:{
        type: Schema.Types.ObjectId,
        ref:"user",
    },
    created_At:{
        type:Date,
        default:Date.now(),
    },
    


});



module.exports = mongoose.model("review",reviewSchema);