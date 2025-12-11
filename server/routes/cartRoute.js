const express = require("express");

const {addProduct,
    findProducts,
    updateCartProduct,
    removeProduct
} = require("../controllers/cartController.js");

const router = express.Router();

router.post("/addcart",addProduct);
router.get("/find",findProducts);
router.put("/update",updateCartProduct);
router.delete("/delete",removeProduct);

module.exports = router;