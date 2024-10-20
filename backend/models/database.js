const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
    .then(()=> {
        console.log("MongoDB connected properly");
    }).catch((err) => {
        console.log("Database Connection Error", err);
    })