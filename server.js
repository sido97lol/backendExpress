const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { getLogin, getRegister } = require("./controllers/userController");
const { getAddProduct, getDashboard, getProduct, getOrders, getEditProducts } = require("./controllers/dashboardController");
const { getLanding, getOrderNow } = require("./controllers/marketplaceController");
const path = require("path");




dotenv.config();
connectDB();

const app = express();

app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // or '*' for all origins (less secure)
    credentials: true, // if you're using cookies/auth headers
}));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/marketplace", marketplaceRoutes);
// app.use("/dashboard",dashboardFrontRoutes);


app.get("/", getLanding);
app.get("/order-now", getOrderNow);
app.get("/register", getRegister);
app.get("/login", getLogin);
app.get("/dashboard", getDashboard);
app.get("/dashboard/orders", getOrders);
app.get("/dashboard/products", getProduct);
app.get("/dashboard/add-product", getAddProduct);
app.get("/dashboard/edit-product", getEditProducts);





// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
