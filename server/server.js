const express = require("express");
const dotenv = require("dotenv");
const {connectDB} = require("./utils/db.js");
const cors = require("cors");
const userRoute = require("./routes/userRoute.js");
const productRoute = require("./routes/productRoute.js");
const cartRoute = require("./routes/cartRoute.js");

//Initialize
const app = express();

//config
dotenv.config({ quiet: true });

//DB Connection
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}));

//API Routes
app.use("/api/user",userRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);

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

