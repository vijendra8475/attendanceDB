const express = require("express");
const { markAttendanceForAll } = require("../controllers/attendance.controller");
const router = express.Router();

router.post("/mark", markAttendanceForAll);

module.exports = router;
