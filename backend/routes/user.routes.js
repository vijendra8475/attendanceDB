const express = require("express");
const { checkAttendance, userLogin } = require("../controllers/user.controllers");
const router = express.Router();

router.post("/login", userLogin);
router.post('/check', checkAttendance);

module.exports = router;
