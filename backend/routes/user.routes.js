const User = require('../models/user.model.js');

const userLogin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email)
            return res.status(400).json({ message: "Email is required" });

        // findOne is better
        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ message: 'No user found' });

        return res.status(200).json({
            message: 'User found',
            data: user
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, phone, name, username } = req.body;

        if (!email || !phone || !name || !username)
            return res.status(400).json({ message: 'All fields are required' });

        // check if user already exists
        const already = await User.findOne({ email });
        if (already)
            return res.status(409).json({ message: "User already exists" });

        const user = await User.create({
            name,
            username,
            email,
            phone,
            joining: Date.now(),  // FIXED
            imageUrl: 'nothing'
        });

        return res.status(201).json({
            message: 'User Registered Successfully',
            user
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
