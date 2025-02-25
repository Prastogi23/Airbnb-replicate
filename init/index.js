const initData = require("./data.js");
const listingSchema = require("../models/listings.js");
const connectDB = require("../DB/connectDB.js");

const data = new listingSchema({
  title: "villa Palace",
  discription: "3 BHK ",
  price:1200,
  location:"agra",
  country:"India"
});

const initDB = async () => {
  try {
  await connectDB();
  await listingSchema.deleteMany({});
   initData.data = initData.data.map((obj)=>({...obj,owner:"66f3ec94f104d6a7d46d8097"}));
  await listingSchema.insertMany(initData.data);
  // await data.save().then((res)=>{console.log(res)})
  // .catch((err)=>{ console.log(err)});
  // let data1 = await listingSchema.find({});
  console.log("data was initialized");
  } catch (error) {
    console.log(error);
  }
  
};

initDB();
