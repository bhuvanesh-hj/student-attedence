//buttons
const searchBtn = document.getElementById("searchbutton");
const attendenceReportBtn = document.getElementById("fetchbutton");
const attendenceSubmitBtn = document.getElementById("submitbtn");
attendenceSubmitBtn.style.display = "none";
const addStudentBtn = document.getElementById("addStudentButton");
//lists
const attendenceList = document.getElementById("attendanceList");
const reportTable = document.getElementById("reportTable");
//form
const markAttendenceForm = document.getElementById("form");

//functions
const fetchStudents = async (e) => {
  try {
    const dateInput = document.getElementById("selectdate").value;
    const result = await axios.get(
      `http://localhost:3000/attendence/get-attendence/${dateInput}`
    );
    if (!result.data.status) {
      // console.log("hii");
      const response = await axios.get(
        "http://localhost:3000/attendence/get-students"
      );

      const students = response.data.students;
      // console.log(students);
      attendenceList.innerHTML = "";
      reportTable.innerHTML = "";

      students.forEach((student) => {
        const studentName = student.name;
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `<label><strong>${studentName}</strong></label>
                                  <input type="radio" id="flexRadioDefault2" class="form-check-input ${student.id}" name="${studentName}" value="present" >
                                  <label class="form-check-label" for="flexRadioDefault2">Present</label>
                                  <input type="radio" id="flexRadioDefault2" class="form-check-input ${student.id}" name="${studentName}" value="absent">
                                  <label class="form-check-label" for="flexRadioDefault2">Absent</label>`;
        attendenceList.appendChild(listItem);
      });
      attendenceSubmitBtn.style.display = "block";
    } else {
      // console.log("hello");
      showAttendence(result.data.data[0].Presents);
    }
  } catch (error) {
    console.error(error);
  }
};



const fetchAttendece = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.get(
      "http://localhost:3000/attendence/get-students"
    );
    const students = response.data.students;

    attendenceList.innerHTML = "";
    reportTable.innerHTML = "";

    const headerRow = reportTable.insertRow(0);
    const headerNameCell = headerRow.insertCell(0);
    const headerPresentCell = headerRow.insertCell(1);
    const headerPercentageCell = headerRow.insertCell(2);
    headerNameCell.textContent = "Student Name";
    headerPercentageCell.textContent = "Precentage";
    headerPresentCell.textContent = "Presents/Total";

    students.forEach((student) => {
      const row = reportTable.insertRow(-1);
      const nameCell = row.insertCell(0);
      const PresentCell = row.insertCell(1);
      const PercentageCell = row.insertCell(2);

      const { name, numberOfDaysPresent, totalNumberOfDays } = student;

      const PresentDays = `${numberOfDaysPresent}/${totalNumberOfDays}`;
      const Precentage = (
        (numberOfDaysPresent / totalNumberOfDays) *
        100
      ).toFixed(2);

      nameCell.textContent = name;
      PresentCell.textContent = PresentDays;
      PercentageCell.textContent = Precentage;

      attendenceSubmitBtn.style.display = "none";
    });
  } catch (error) {
    console.error(error);
  }
};

const submitAttendence = async (e) => {
  e.preventDefault();
  try {
    const dateInput = document.getElementById("selectdate").value;
    const radioInputs = document.querySelectorAll("input[type=radio]:checked");

    const attendenceData = [];

    radioInputs.forEach(async (radioInput) => {
      const studentName = radioInput.name;
      const status = radioInput.value.toLowerCase();
      const studentId = radioInput.className.toString().split(" ")[1];
      // console.log(studentName,status,studentId);

      attendenceData.push({
        studentName,
        status,
      });

      if (studentId) {
        if (status == "present") {
          console.log(`${studentName} : ${status}`);
          await axios.put(
            `http://localhost:3000/attendence/update?studentId=${studentId}&status=present`
          );
        } else {
          console.log(`${studentName} : ${status}`);
          await axios.put(
            `http://localhost:3000/attendence/update?studentId=${studentId}&status=absent`
          );
        }
      }
    });
    const data = {
      date: dateInput,
      Presents: JSON.stringify(attendenceData),
    };

    axios
      .post("http://localhost:3000/attendence/add-attendence", data)
      .then((res) => {
        showAttendence(res.data.data.Presents);
      });
  } catch (error) {
    console.error(error);
    document.getElementsByTagName(
      "body"
    ).innerHTML = `<h1>Something went wrong!!!</h1>`;
  }
};

const showAttendence = (presentsData) => {
  try {
    const AttendenceData = JSON.parse(presentsData);

    attendenceList.innerHTML = "";
    reportTable.innerHTML = "";

    AttendenceData.forEach((studentData) => {
      // console.log(studentData);
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `<strong>${studentData.studentName}</strong>: ${studentData.status}`;
      attendenceList.appendChild(listItem);

      attendenceSubmitBtn.style.display = "none";
    });
  } catch (error) {
    console.log(error);
  }
};

const addStudent = async (e) => {
  const name = document.getElementById("name").value;

  const response = await axios.post(
    `http://localhost:3000/attendence/add-student`,
    {
      name: name,
    }
  );
  document.getElementById("name").value = "";
};

searchBtn.addEventListener("click", fetchStudents);
attendenceReportBtn.addEventListener("click", fetchAttendece);
markAttendenceForm.addEventListener("submit", submitAttendence);
addStudentBtn.addEventListener("click", addStudent);
