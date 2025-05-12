const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    buyerName: { type: String, required: true }, // Buyer
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Seller
    wilaya: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Shipped", "Completed","Aborted"], default: "Pending" },
    //enum: enumeration => ["","",""]
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
