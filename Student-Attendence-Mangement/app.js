const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

// routes
const attendanceRoute = require("./routes/attendence");
const homePage = require('./routes/home');

// connection of dataBase
const sequelize = require("./util/database");

// modals of the app
const Attendence = require("./models/attendence");
const Students = require("./models/students");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static("public"));

//  connecting the routes
app.use('/attendence',attendanceRoute);
app.use(homePage);

Students.hasMany(Attendence);
Attendence.belongsTo(Students);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("model successfully synchronized");
    app.listen(3000);
  })
  .catch((e) => console.log(e));
