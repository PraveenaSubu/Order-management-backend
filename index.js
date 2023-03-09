require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/connect");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
db();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", customerRoutes);
app.use("/api", orderRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to my Order Management Application");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});