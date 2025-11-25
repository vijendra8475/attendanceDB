const express = require("express");
const { createUser, userLogin } = require("../controllers/user.controllers.js");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", userLogin);

module.exports = router;
