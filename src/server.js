const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
if(!db)
    console.log("Error connecting to database")
else
    console.log("Connected to database successfully")

const app = express();

// configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(routes);

module.exports = app;
