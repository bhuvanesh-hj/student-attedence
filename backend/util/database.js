const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-first", "root", "Bhuvi112233@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;