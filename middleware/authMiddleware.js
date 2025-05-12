const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

        } catch (error) {
            res.status(401).json({ message: "Unauthorized, Doesnt belong to us" });
        }
    } else {
        res.status(401).json({ message: "Unauthorized, No authorization Header" });
    }
};

module.exports = { protect };
