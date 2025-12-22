const productModel = require("../models/productModel.js");
const { TryCatch } = require("../middlewares/TryCatch.js")

const getAllProducts = TryCatch( async(req, res) => {
    
const page = Number(req.query.page) || 1;
  const limit = 8;

  const skip = (page - 1) * limit;

  const totalProducts = await productModel.countDocuments();

  const products = await productModel
    .find({})
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
  });
})

const createProduct = TryCatch( async(req, res) => {
    const {title,description,price,image,category} = req.body;
    
    const product = await productModel.create({title,description,price,image,category});

    return res.status(201).json({message:"Product created successfully",productData:product});
});

const updateProduct = TryCatch( async(req, res) => {
    const {id,data} = req.body;

    const product = await productModel.findByIdAndUpdate(id,{$set : data},{new:true});
    console.log(product);

    return res.status(200).json({message:"Product updated successfully"});
});

const findProduct = TryCatch( async(req, res) => {
    const {id} = req.body;

    const product = await productModel.findById(id);

    return res.status(200).json({message:"success",product});
});

const deleteProduct = TryCatch( async(req, res) => {
    const {id} = req.params;

    const product = await productModel.findByIdAndDelete(id);

    return res.status(200).json({message:"Product deleted successfully"});
});

module.exports = {getAllProducts, createProduct, updateProduct, findProduct, deleteProduct};