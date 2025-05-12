const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const Category = require("../models/Category");
const path = require("path")
// @desc   Get all products with optional category filter
// @route  GET /api/marketplace
const getAllProducts = async (req, res) => {
    try {
        const { category_id } = req.query;
        const filter = category_id ? { category_id } : {};

        const products = await Product.find(filter)
            .populate("userId", "username")
            .populate("category_id", "name");

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Get product details
// @route  GET /api/marketplace/:id
const getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("userId", "username")
            .populate("category_id", "name");

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Place an order
// @route  POST /api/marketplace/order
const placeOrder = async (req, res) => {
    try {
        const { productId, buyerName, wilaya, sellerId } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const order = await Order.create({
            productId,
            sellerId,
            buyerName,
            wilaya,
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getLanding = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'landing.html'));

}
const getOrderNow = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'order-now.html'));

}


module.exports = { getLanding, getOrderNow, getAllProducts, getProductDetails, placeOrder };
