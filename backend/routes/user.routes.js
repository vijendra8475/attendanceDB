const express = require("express");
const { checkAttendance, userLogin } = require("../controllers/user.controllers.js");
const router = express.Router();

router.post("/login", userLogin);
router.get('/check', checkAttendance)

module.exports = router;
