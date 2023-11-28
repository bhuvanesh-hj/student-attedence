const Attendence = require("../models/attendence");
const Students = require("../models/students");

exports.addAttendence = async (req, res, next) => {
  try {
    const date = req.body.date;
    const attendenceData = req.body.Presents;
    let newAttendenceData = await Attendence.create({
      Date: date,
      Presents: attendenceData,
    });
    res.status(201).json({ data: newAttendenceData });
    console.log("Succesfully submited the attendence");
  } catch (error) {
    console.log("error occured");
  }
};

exports.getAllAttendence = async (req, res, next) => {
  try {
    const students = await Students.findAll();
    res.status(200).json({ students, message: "Successful fetch" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getAttendence = async (req, res, next) => {
  try {
    const particularDate = req.params.date;
    // console.log(particularDate);
    const attendenceReport = await Attendence.findAll({
      attributes: ["id", "Presents"],
      where: {
        Date: particularDate,
      },
    });
    if (attendenceReport.length === 0) {
      return res.json({ 'status': false });
    }
    const finalRecords = attendenceReport.map((data) => ({
      id: data.id,
      Presents: data.Presents,
    }));
    return res.json({ data: finalRecords, status: true });
  } catch (error) {
    console.error("Error occured during the fetch", error);
     return res.status(500).json({ message: "Internal server error!!!" });
  }
};

exports.addStudent = async (req, res, next) => {
  try {
    const studentName = req.body.name;
    // console.log(studentName);
    const response = await Students.create({
      name: studentName,
      totalNumberOfDays: 0,
      numberOfDaysPresent: 0,
    });
    res.status(200).json({ message: "Student Added" });
    console.log("Student added");
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { studentId, status } = req.query;
    const student = await Students.findByPk(studentId);
    // console.log(studentId);
    student.totalNumberOfDays += 1;
    if (status == "present") student.numberOfDaysPresent += 1;
    const response = await student.save();
    res.status(200).json({ response });
  } catch (error) {
    console.log("error occcured", error);
  }
};
