const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const app = express();
const router = require('./routes');
const cors = require("cors")

const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors())
app.use(express.json({ extended: false }));
app.use('/', router);

app.listen(PORT, () => {
  console.log(`server i sup and runuing in the PORT :${PORT}`);
});
