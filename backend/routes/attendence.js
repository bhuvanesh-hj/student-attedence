const express = require("express");

const router = express.Router();

const attendenceController = require("../controllers/attendenceController");

router.post("/add-attendence", attendenceController.addAttendence);

router.get("/get-attendence/:date", attendenceController.getAttendence);

router.get("/get-all-attendence", attendenceController.getAllAttendence);


module.exports = router;
