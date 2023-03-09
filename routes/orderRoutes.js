const express = required("express");
const router = express.Router();

const { getAllOrders, getOrderById, addOrders, updateOrders, deleteOrders, dashboardOrderDetails } = require("../controllers/orderControllers");

router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderById);

router.post("/orders", addOrders);

router.put("/orders/:id", updateOrders);

router.delete("/orders/:id", deleteOrders);

router.get("/dashboard-totalorders", dashboardOrderDetails);


module.exports = router;