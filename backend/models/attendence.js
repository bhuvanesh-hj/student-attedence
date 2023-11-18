const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const attendence = sequelize.define("attendence", {
  date:{
    type:Sequelize.STRING,

  },
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  bhuvi: {
    type: Sequelize.STRING,
  },
  hari: {
    type: Sequelize.STRING,
  },
  babu: {
    type: Sequelize.STRING,
  },
  gopi: {
    type: Sequelize.STRING,
  },
  karidas: {
    type: Sequelize.STRING,
  },
  json: {
    type: Sequelize.STRING,
  },
   jackson: {
    type: Sequelize.STRING,
  }
});

module.exports = attendence;
