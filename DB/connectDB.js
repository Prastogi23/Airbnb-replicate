const mongoose = require("mongoose");

let url = "mongodb://127.0.0.1:27017/Wanderlust";

const connectDB =  async () => {
   try
   {
    const connection = await mongoose.connect(url);
    console.log("Database Connect Successfully");
   }catch(error){
    console.log(error);
   }
};

module.exports = connectDB;
 