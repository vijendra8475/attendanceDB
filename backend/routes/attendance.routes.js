const express = require("express");
const markAttendanceForAll = require("../controllers/attendance.controller.js");
const router = express.Router();

router.post("/mark", markAttendanceForAll);

module.exports = router;
