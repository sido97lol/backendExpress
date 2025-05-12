const express = require("express");
const { getEditProduct, getCategories, addProduct, editProduct, deleteProduct, getUserOrders, updateOrderStatus, getProducts } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware")

const router = express.Router();

router.get("/products", protect, getProducts);
router.post("/products", protect, upload.single("image"), addProduct);
router.get("/products/:id", protect, getEditProduct);
router.put("/products/:id", protect, editProduct);
router.post("/products/:id", protect, upload.single("image"), editProduct);


router.get("/orders", protect, getUserOrders);
router.put("/orders/:id", protect, updateOrderStatus);


router.get("/categories", getCategories);


module.exports = router;
