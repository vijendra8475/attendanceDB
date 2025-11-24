const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const app = express();
dotenv.config()
app.use(cors());


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(process.env.CONNECTION_URL);
    
    console.log(`server is listening on port ${PORT}`);
    connectDB();
})

app.get("/", (req, res) => {
    console.log('getting request on "/"');
    res.end('nothing here...')
})

