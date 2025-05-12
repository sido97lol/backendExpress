const User = require("../models/User");
const jwt = require("jsonwebtoken");
const path = require('path');

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc   Register a new user
// @route  POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already taken" });

        // Create new user
        const user = await User.create({ username, password });

        // Generate token and send response
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user)
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Login user
// @route  POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Check user and password
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user)
            });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Get user profile
// @route  GET /api/auth/me
// @access Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getRegister = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'authentification.html'));
};

const getLogin = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'authentification.html'));
};
module.exports = { getRegister, getLogin, registerUser, loginUser, getUserProfile };
