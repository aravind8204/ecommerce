const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      id: String,
      url: String,
    },
  ],
  sold: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdAT: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;