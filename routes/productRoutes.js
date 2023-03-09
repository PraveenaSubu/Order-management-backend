const express = required("express");
const router = express.Router();

const { getAllProducts, getProductById, addProducts, updateProducts, deleteProducts, dashboardProductDetails } = require("../controllers/productControllers");

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", addProducts);

router.put("/products/:id", updateProducts);

router.delete("/products/:id", deleteProducts);

router.get("/dashboard-totalproducts", dashboardProductDetails);


module.exports = router;