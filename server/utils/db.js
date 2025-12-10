const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log("error",err);
    };
}

module.exports = {connectDB};