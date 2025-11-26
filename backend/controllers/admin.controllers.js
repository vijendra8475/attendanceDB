const User = require('../models/user.model')

const adminLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Email and password required" });

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return res.status(200).json({
            message: "Admin login successful",
            admin: true
        });
    }

    return res.status(401).json({ message: "Invalid admin credentials" });
};

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

module.exports = { adminLogin, createUser };
