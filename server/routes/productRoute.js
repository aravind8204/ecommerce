const express = require("express");
const {getAllProducts, 
    createProduct,
    updateProduct,
    findProduct,
    deleteProduct} = require("../controllers/productController.js");
const {isAdmin} = require("../middlewares/isAuth.js")

const router = express.Router();

router.get("/products",getAllProducts);
router.post("/create",isAdmin,createProduct);
router.put("/updateproduct",isAdmin,updateProduct);
router.post("/findone",findProduct);
router.delete("/delete/:id",isAdmin,deleteProduct);

module.exports = router;