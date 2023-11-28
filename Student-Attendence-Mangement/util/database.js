const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("attendence", "root", "Bhuvi112233@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;