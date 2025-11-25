const User = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const { email, phone, name, username } = req.body;

        if (!email || !phone || !name || !username)
            return res.status(400).json({ message: 'All fields are required' });

        const exists = await User.findOne({ email });

        if (exists)
            return res.status(409).json({ message: 'User already exists' });

        const user = await User.create({
            name,
            username,
            email,
            phone,
            joining: Date.now(),
            imageUrl: "default.png"
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email)
            return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "User not found" });

        return res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createUser, userLogin };

