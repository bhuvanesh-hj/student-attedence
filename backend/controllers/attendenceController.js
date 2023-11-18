const Attendence = require("../models/attendence");

exports.addAttendence = (req, res, next) => {
  const attendenceReport = req.body;
  Attendence.create(attendenceReport).then((result) => {
    res.status(200).json("attendence inserted ");
  });
};

exports.getAllAttendence = (req, res, next) => {
  Attendence.findAll({
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }, 
  })
    .then((attendances) => {
      res.json(attendances);
    })
    .catch((error) => {
      console.error('Error fetching all attendance records:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.getAttendence = (req, res, next) => {
  const date = req.params.date;

  Attendence.findOne({ where: { date: date } }).then((record) => {
    res.json(record);
  });
};


