let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let routes = require("./routes");

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting to database")
else
    console.log("Connected to database successfully")

let app = express();

// port on which the server will run
let port = process.env.PORT || 3000;

// configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(routes)

app.listen(port, function () {
     console.log(`🚀  Server is running on port ${port}`);
});
