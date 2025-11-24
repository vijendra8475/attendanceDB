const adminLogin  = (req, res, next) => {
    const { email, password } = req.body;

    if( !email || !password)
        return res.status(400).json({message : 'email and password must require'})

    if( email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD)
        return res.status(400).json({ message : "email and password is invalid"})

    if( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){
        res.status(200).json({
            message : 'Login successfully',
            admin : true
        })
    }
}


module.exports = adminLogin;
