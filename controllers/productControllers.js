const Products = required("../models/productModel");

exports.getAllProducts = (req, res) => {
    try {
        Products.find((err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while retrieving products" });
            }
            return res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.getProductById = (req, res) => {
    try {
        Products.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while retrieving product" });
            }
            res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.addProducts = (req, res) => {
    try {
        let products = new Products(req.body);
        products.save((err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while adding a new products" });
            }
            res.status(201).send({ id: data._id, message: "New product has been added successfully." })
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.updateProducts = (req, res) => { //using path parameter
    try {
        Products.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while updating an existing product" })
            }
            res.status(201).send({ id: data._id, message: "Product has been updated successfully" })
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
};

exports.deleteProducts = (req, res) => {
    try {
        Products.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while deleting an product" })
            }
            res.status(200).send({ message: "Product as been deleted successfully" })
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


exports.dashboardProductDetails = async (req, res) => {
    try {
        const value = await Products.find();
        const totalAvaliableStock = value.map((item) => item.stock).reduce((initialValue, currentValue) => initialValue + currentValue);
        res.status(200).send({ totalProducts: value.length, totalAvaliableStock });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}