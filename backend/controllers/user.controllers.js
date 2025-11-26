const User = require('../models/user.model');

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

const checkAttendance = async (req, res) => {
    const { user } = req.body;

    if (!user) return res.status(400).json({ message: 'User required' });

    const attendance = await User.findById(user)

    if (!attendance.length === 0)
        return res.status(400).json({ message: 'No Attendance found' });

    return res.status(200).json({
        message: 'User Attendance',
        data: attendance
    })
}

module.exports = { checkAttendance, userLogin };

