const Orders = required("../models/orderModel");

exports.getAllOrders = (req, res) => {
    try {
        Orders.find((err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while retrieving orders" });
            }
            return res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.getOrderById = (req, res) => {
    try {
        Orders.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while retrieving order" });
            }
            res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.addOrders = (req, res) => {
    try {
        let orders = new Orders(req.body);
        orders.save((err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while adding a new order" });
            }
            res.status(201).send({ id: data._id, message: "New order has been added successfully." })
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.updateOrders = (req, res) => { //using path parameter
    try {
        Orders.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while updating an existing order" })
            }
            res.status(201).send({ id: data._id, message: "orders has been updated successfully" })
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
};

exports.deleteOrders = (req, res) => {
    try {
        Orders.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while deleting an order" })
            }
            res.status(200).send({ message: "Orders as been deleted successfully" })
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


exports.dashboardOrderDetails = async (req, res) => {
    try {
        const value = await Orders.find();
        const totalRevenueFromOrders = value.map((item) => item.amount).reduce((initialValue, currentValue) => initialValue + currentValue);
        res.status(200).send({ totalOrders: value.length, totalRevenueFromOrders });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}