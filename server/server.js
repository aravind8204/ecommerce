const express = require("express");
const dotenv = require("dotenv");
const {connectDB} = require("./utils/db.js");
const cors = require("cors");
const userRoute = require("./routes/userRoute.js");

//Initialize
const app = express();

//config
dotenv.config({ quiet: true });

//DB Connection
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//API Routes
app.use("/api/user",userRoute);

//variables
const PORT = process.env.PORT;

//test 
app.get("/test",(req,res)=>{
    res.send("server running")
});

//server listening
app.listen(PORT,()=>{
    console.log("running",PORT);
});

