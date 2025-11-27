const User = require('../models/user.model');
const Attendance = require('../models/attendance.model');

/**
 * POST /attendance/mark
 * Body: { date: "YYYY-MM-DD", present: ["userId1", "userId2", ...] }
 * Creates attendance docs for provided present users and marks others absent.
 */
const markAttendance = async (req, res) => {
  try {
    const { date, present } = req.body;
    if (!date || !Array.isArray(present)) {
      return res.status(400).json({ message: 'date and present array required' });
    }

    const dayStart = new Date(date);
    dayStart.setHours(0,0,0,0);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23,59,59,999);

    const users = await User.find({});
    if (!users.length) return res.status(404).json({ message: 'No users found' });

    // delete existing attendances for that date (optional) OR skip existing entries
    // We'll upsert for each user (create if not exists)
    let created = 0;
    let skipped = 0;

    for (const u of users) {
      const userId = u._id;
      // check if attendance already exists for that user & date
      const existing = await Attendance.findOne({ user: userId, date: { $gte: dayStart, $lte: dayEnd } });
      if (existing) {
        // update status if different
        const newStatus = present.includes(userId.toString()) ? 'present' : 'absent';
        if (existing.status !== newStatus) {
          existing.status = newStatus;
          await existing.save();
        }
        skipped++;
        continue;
      }

      const status = present.includes(userId.toString()) ? 'present' : 'absent';
      await Attendance.create({ user: userId, date: dayStart, status });
      created++;
    }

    return res.status(200).json({
      message: 'Attendance processed',
      created,
      skipped,
      total: users.length
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.toString() });
  }
};

/**
 * GET /attendance/summary
 * Query param optional ?date=YYYY-MM-DD
 */
const summary = async (req, res) => {
  try {
    const qDate = req.query.date ? new Date(req.query.date) : new Date();
    qDate.setHours(0,0,0,0);
    const dayStart = qDate;
    const dayEnd = new Date(qDate); dayEnd.setHours(23,59,59,999);

    const totalStudents = await User.countDocuments();
    const presentToday = await Attendance.countDocuments({ date: { $gte: dayStart, $lte: dayEnd }, status: 'present' });
    const absentToday = await Attendance.countDocuments({ date: { $gte: dayStart, $lte: dayEnd }, status: 'absent' });

    return res.status(200).json({ totalStudents, presentToday, absentToday });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.toString() });
  }
};

module.exports = { markAttendance, summary };
