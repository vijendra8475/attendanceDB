const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send('nothing here...'));

app.use("/admin", require("./routes/admin.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/attendance", require("./routes/attendance.routes"));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  connectDB();
});
