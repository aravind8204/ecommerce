const { TryCatch } = require("../middlewares/TryCatch.js");
const cartModel = require("../models/cartModel.js");

const addProduct = TryCatch( async(req, res) => {
    const {quantity, productId} = req.body;
    const userId = req.user.userId;

    const prevCart = await cartModel.find({user:userId,product:productId});
    if(prevCart){
        await cartModel.updateOne({user:userId,product:productId},{$set:{quantity:quantity}});

        return res.status(200).json({message:"product added"});
    }

    const cart = await cartModel.create({quantity,product:productId,user:userId});

    return res.status(201).json({message:"product added successfully",cart});
});

const removeProduct = TryCatch( async(req, res) => {
    const {id} = req.body;

    const cart = await cartModel.findByIdAndDelete(id);

    return res.status(200).json({message:"product removed successfully"});
});

const findProducts = TryCatch( async(req, res) => {
    const userId = req.user.userId;

    const cart = await cartModel.find({user:userId});

    return res.status(200).json({message:"user cart fetched successfully",cart});

});

const updateCartProduct = TryCatch( async(req, res) => {
    const {productId,userId,quantity} = req.body;

    const cart = await cartModel.findOneAndUpdate({product:productId,user:userId},{$set : {quantity:quantity}});

    return res.status(200).json({message:"product updated"});
});


module.exports = {addProduct, removeProduct, findProducts, updateCartProduct};