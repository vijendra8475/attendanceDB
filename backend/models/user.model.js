const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : String,
    username : String,
    email : String,
    phone : Number,
    joining : Date,
    imageUrl : String,
},{timestamps : true});

const User = mongoose.model("User", userSchema);
module.exports = User;