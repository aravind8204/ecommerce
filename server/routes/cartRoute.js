const express = require("express");

const {addProduct,
    findProducts,
    updateCartProduct,
    removeProduct
} = require("../controllers/cartController.js");
const {isUser} = require("../middlewares/isAuth.js")

const router = express.Router();

router.post("/addcart",isUser,addProduct);
router.get("/find",isUser,findProducts);
router.put("/update",isUser,updateCartProduct);
router.delete("/delete/:id",isUser,removeProduct);

module.exports = router;