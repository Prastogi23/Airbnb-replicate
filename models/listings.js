const { default: mongoose, Schema } = require("mongoose");
const reviewSchema = require("./review");

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        maxLength:500,
        required:true
    },
    image:{
        url: String,
        filename: String
        // type:String,
        // default:
        //     "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        // set: (v) => v===""?
        // "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D"
        // :v,
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
        },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"user",
    }
    // geometry:{
    //     type: {
    //       type: String, // Don't do `{ location: { type: String } }`
    //       enum: ['Point'], // 'location.type' must be 'Point'
    //     },
    //     coordinates: {
    //       type: [Number],
    //     }
    // }
})

listingSchema.post("findOneAndDelete",async(listingSchema)=>{
    if(listingSchema){
        await reviewSchema.deleteMany({_id: {$in: listingSchema.reviews} } );
    }
})


module.exports = mongoose.model("listing",listingSchema);