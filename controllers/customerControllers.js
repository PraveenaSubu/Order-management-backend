const Customers = require("../models/customerModel");

exports.getAllCustomers = (req, res) => {
    try {
        Customers.find((err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while retrieving customer" });
            }
            return res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.getCustomersById = (req, res) => {
    try {
        Customers.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while retrieving customer" });
            }
            res.status(200).send(data);
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.addCustomers = (req, res) => {
    try {
        let customer = new Customers(req.body);
        customer.save((err, data) => {
            if (err) {
                return res.status(400).send({ msg: "Error while adding a new customer" });
            }
            res.status(201).send({ id: data._id, msg: "New customer has been added successfully" })
        })
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

exports.updateCustomers = (req, res) => {
    try {
        Customers.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while updating an existing customer" })
            }
            res.status(201).send({ id: data._id, message: "Customer has been updated successfully" })
        })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
};

exports.deleteCustomers = (req, res) => {
    try {
        Customers.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).send({ message: "Error while deleting an customer" })
            }
            res.status(200).send({ message: "Customer as been deleted successfully" })
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.dashboardCustomerDetails = async (req, res) => {
    try {
        const value = await Customers.find();
        res.status(200).send({ totalCustomers: value.length });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}