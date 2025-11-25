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

module.exports = adminLogin;
