const User = require('../models/user.model')
const Attendance = require('../models/user.model')

const markAttendanceForAll  = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) return res.status(400).json({ messag: 'Status is required' })

        const validStatus = ['present', 'absent']

        if (!status.includes(validStatus)) return res.json(400).json({ messag: 'Invalid status' });

        const users = await User.find({});

        if (users.length == 0) return res.json(404).status({ message: 'No user found' })

        const today = new Date().setHours(0, 0, 0, 0);
        let createdCount = 0;
        let skippedCount = 0;


        for (const user of users) {
            const already = await Attendance.findOne({
                user: user._id,
                date: today
            });

            if (already) {
                skippedCount++;
                continue;
            }

            await Attendance.create({
                user: user._id,
                date: today,
                status
            })

            createdCount++;

            return res.status(200).json({
                message: "Attendance marked successfully",
                created: createdCount,
                skipped: skippedCount,
                total: users.length
            });

        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message : `Server error : ${err}`})
    }
}

module.exports = markAttendanceForAll;