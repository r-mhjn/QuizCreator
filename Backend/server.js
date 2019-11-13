const express = require("express");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // to read the dotenv file containing env variables
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGOURI;
const morgan = require("morgan");

// Middleware cors = cros origin policy (using this we can send req from one server to another)
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS,PUT, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("short")); // its a middleware which gives the details of the requests made to the server

//MiddleWare like bodyparser
app.use(express.json());

//Passport Middleware
app.use(passport.initialize());

// Bring all routes
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");

// actual routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);

// Connect to database
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    reconnectTries: 30,
    reconnectInterval: 500, 
  })
  .then(() => {
    console.log("Mongo connected successfully");
  })
  .catch(err => console.log("Error connecting to database " + err));

app.listen(port, () => console.log(`server is running at port ${port}`));
