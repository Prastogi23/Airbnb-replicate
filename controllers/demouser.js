const user = require("../models/user");

const demouser = async (req,res)=>{
    let fakeuser = new user({
        email:"student@gmail.com",
        username:"student321",
    });

    let result = await user.register(fakeuser,"helloworld");
    console.log(result);
}



module.exports = {demouser};