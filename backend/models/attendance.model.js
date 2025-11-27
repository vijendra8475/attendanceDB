const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['absent', 'present'],
    default: 'absent'
  }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
