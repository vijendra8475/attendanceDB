const User = require('../models/user.model');

const adminLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ message: "Admin login successful", admin: true });
  }

  return res.status(401).json({ message: "Invalid admin credentials" });
};

const createUser = async (req, res) => {
  try {
    const { email, phone, name, username } = req.body;
    if (!email || !phone || !name || !username) return res.status(400).json({ message: 'All fields are required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'User already exists' });

    const user = await User.create({
      name,
      username,
      email,
      phone,
      joining: new Date(),
      imageUrl: "default.png"
    });

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

const getAllUsers = async(req, res) => {
    try{
        const res = await User.find();

        if(res.length == 0)
            return res.status(404).json('No user found')
        return res.status(200).json({ data : res, message : "User founds successfully"});
    }
    catch(err){
        console.error(err);
        res.status(404).json('Error')
    }
}

module.exports = { adminLogin, createUser, getAllUsers };
