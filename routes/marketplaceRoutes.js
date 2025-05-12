const express = require("express");
const { getAllProducts, getProductDetails, placeOrder } = require("../controllers/marketplaceController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);
router.post("/order", placeOrder);

module.exports = router;
