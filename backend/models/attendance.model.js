const mongoose = require('mongoose')

const attendance = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    date : {
        type : Date,
        default : Date.now,
        require : true
    },
    status : {
        type : String,
        enum : ['absent', 'present'],
        default : 'absent'
    }
})

// const Attendance = 

module.exports = mongoose.model("Attendance", attendanceSchema);
