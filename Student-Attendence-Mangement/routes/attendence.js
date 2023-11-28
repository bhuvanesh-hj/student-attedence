const express = require("express");

const router = express.Router();

const attendenceController = require("../controllers/attendenceController");

router.post("/add-attendence", attendenceController.addAttendence);

router.get("/get-attendence/:date", attendenceController.getAttendence);

router.get("/get-students", attendenceController.getAllAttendence);

router.put("/update", attendenceController.update);

router.post("/add-student", attendenceController.addStudent);

module.exports = router;
