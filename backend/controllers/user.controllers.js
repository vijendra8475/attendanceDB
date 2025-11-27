const User = require('../models/user.model');
const Attendance = require('../models/attendance.model');

/**
 * POST /user/login
 * Body: { email }
 */
const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

/**
 * POST /user/check
 * Body: { user: "userId" }
 */
const checkAttendance = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) return res.status(400).json({ message: 'User id required' });

    const records = await Attendance.find({ user }).sort({ date: -1 }).populate('user', 'name email');
    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'No attendance found', data: [] });
    }

    return res.status(200).json({ message: 'User Attendance', data: records });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.toString() });
  }
};

module.exports = { checkAttendance, userLogin };
