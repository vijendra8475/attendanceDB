const express = require("express");
const {adminLogin, createUser, getAllUsers} = require("../controllers/admin.controllers.js");
const router = express.Router();

router.post("/login", adminLogin);
router.post('/create', createUser);
router.post('/students', getAllUsers)

module.exports = router;
