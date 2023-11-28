const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const Attendence = sequelize.define("Attendence", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  Presents: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Attendence;
