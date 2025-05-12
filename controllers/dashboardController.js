const path = require("path");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");

// @desc   Get all products for the logged-in user
// @route  GET /api/dashboard/products
const getProducts = async (req, res) => {
    try {
        const userId = req.user._id;
        const products = await Product.find({ userId }).populate("category_id", "name");
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Add a new product
// @route  POST /api/dashboard/products
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category_id } = req.body;

        if (!name || !description || !price || !category_id || !req.file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //req.file = "image.jpeg + Other information"
        //req.file.filename = "image.jpeg"
        const image = `uploads/${req.file.filename}`;
        //const image = "uploads/image.jpeg"
        const product = await Product.create({
            name: name,
            description,
            price: parseFloat(price),
            image,
            category_id,
            userId: req.user._id
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Edit a product
// @route  PUT /api/dashboard/products/:id
const editProduct = async (req, res) => {

    try {
        const { name, description, price, category_id } = req.body;
        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);

        if (!name || !description || !price || !category_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updateData = { name, description, price, category_id };

        if (req.file) {
            updateData.image = path.join("uploads", req.file.filename);
        }

        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            updateData,
            { new: true }
        );

        if (!product) return res.status(404).json({ message: "Product not found or unauthorized" });

        res.json(product);
    } catch (error) {
        console.error("Error editing product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Delete a product
// @route  DELETE /api/dashboard/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!product) return res.status(404).json({ message: "Product not found or unauthorized" });

        // Delete from uploads folder

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Get all orders for a user's products
// @route  GET /api/dashboard/orders
const getUserOrders = async (req, res) => {
    try {
        //buyerName | Product Name | Price | Wilaya | Status | Actions
        const orders = await Order.find({ sellerId: req.user._id }).populate("productId", "name price");
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Update order status
// @route  PUT /api/dashboard/orders/:id
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, sellerId: req.user._id }, //Condition of FIND
            { status }, // Updated Values
            { new: true }
        );

        if (!order) return res.status(404).json({ message: "Order not found or unauthorized" });

        res.json(order);
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Get all categories
// @route  GET /api/dashboard/categories 
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getEditProduct = async (req, res) => {
    const product = await Product.findOne(
        { _id: req.params.id, userId: req.user._id },
    );
    if (!product) res.status(404).json({ message: "Couldnt find product" });

    return res.status(200).json(product);

}


const getDashboard = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
}
const getProduct = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'product.html'));
}
const getOrders = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'orders.html'));
}
const getAddProduct = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'add-product.html'));
}
const getEditProducts = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'edit-product.html'));
}
module.exports = {
    getEditProducts,
    getAddProduct,
    getOrders,
    getProduct,
    getDashboard,
    getEditProduct,
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
    getUserOrders,
    updateOrderStatus,
    getCategories
};
