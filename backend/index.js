const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')


dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})

app.get("/", (req, res) => {
    console.log('getting request on "/"');
    res.end('nothing here...')
})

