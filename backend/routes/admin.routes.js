const express = require("express");
const {adminLogin, createUser} = require("../controllers/admin.controllers.js");
const router = express.Router();

router.post("/login", adminLogin);
router.post('/create', createUser)

module.exports = router;
