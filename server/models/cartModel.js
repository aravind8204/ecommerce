const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: Number, 
    min: 1,
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;