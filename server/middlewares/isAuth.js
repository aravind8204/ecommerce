const jwt = require("jsonwebtoken");
const {TryCatch} = require("./TryCatch.js")

const isAdmin = TryCatch( async(req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).json({message:"No token provided"});
    }

    // const token = req.header("token");

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"token not found"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if(decoded.role==="admin"){
        req.user = decoded;
        return next();
    }

    return res.status(401).json({message:"user is not a admin"});

});

const isUser = TryCatch( async(req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).json({message:"No token provided"});
    }

    // const token = req.header("token");

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"token not found"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    

    req.user = decoded;
    return next();
});


module.exports = {isAdmin, isUser};