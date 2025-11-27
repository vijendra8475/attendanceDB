const express = require("express");
const { markAttendance, summary } = require("../controllers/attendance.controller");
const router = express.Router();

router.post("/mark", markAttendance);
router.get("/summary", summary);

module.exports = router;
