const selectDate = document.querySelector("#selectdate");
const form = document.querySelector("#form");
const search = document.querySelector("#search");
const fetchAttendance = document.querySelector("#fetchbutton");
const displayAttendance = document.querySelector("#displayAttendance");

fetchAttendance.addEventListener("click", async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/get-all-attendence"
    );

    const allAttendanceData = response.data;

    const memberAttendance = {};

    allAttendanceData.forEach((record) => {
      const date = record.date;
      for (const member in record) {
        if (member !== "date") {
          if (!memberAttendance[member]) {
            memberAttendance[member] = { totalDays: 0, presentDays: 0 };
          }
          memberAttendance[member].totalDays++;
          if (record[member] === "present") {
            memberAttendance[member].presentDays++;
          }
        }
      }
    });

    displayAttendance.innerHTML = "<h3>Attendance Summary</h3>";
    for (const member in memberAttendance) {
      const memberInfo = memberAttendance[member];
      const percentage = (memberInfo.presentDays / memberInfo.totalDays) * 100;
      displayAttendance.innerHTML += `<p class="attendance-info">${member}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
        memberInfo.presentDays
      }/${
        memberInfo.totalDays
      }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (${percentage.toFixed(
        2
      )}%)</p>`;
    }
  } catch (error) {
    console.error("Error fetching attendance data:", error);
  }
});

search.addEventListener("click", () => {
  const previousAttendance = JSON.parse(localStorage.getItem(selectDate.value));
  if (previousAttendance) {
    showAttendance(previousAttendance);
  } else {
    showForm();
  }
});
function showForm() {
  displayAttendance.innerHTML = "";
  form.innerHTML = `
    <div>
        bhuvi <input type="radio" class="bhuvi" name="bhuvi" value="present">Present
        <input type="radio" class="bhuvi" name="bhuvi" value="Absent">Absent
        </div>
        <div>
        hari <input type="radio" class="hari" name="hari" value="present">Present
        <input type="radio" class="hari" name="hari" value="Absent">Absent
        </div>
        <div>
        babu <input type="radio" class="babu" name="babu" value="present">Present
        <input type="radio" class="babu" name="babu" value="Absent">Absent
        </div>
        <div>
        gopi <input type="radio" class="gopi" name="gopi" value="present">Present
        <input type="radio" class="gopi" name="gopi" value="Absent">Absent
        </div>
        <div>
        karidas <input type="radio" class="karidas" name="karidas" value="present">Present
        <input type="radio" class="karidas" name="karidas" value="Absent">Absent
        </div>
        <div>
        json <input type="radio" class="json" name="json" value="present">Present
        <input type="radio" class="json" name="json" value="Absent">Absent
        </div>
        <div>
            jackson <input type="radio" class="jackson" name="jackson" value="present">Present
            <input type= "radio" class="jackson" name="jackson" value="Absent">Absent
        </div>
        <button type="submit">Mark attendance</button>
    `;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = selectDate.value;

  const bhuviRadioButtons = document.querySelectorAll(".bhuvi");
  const hariRadioButtons = document.querySelectorAll(".hari");
  const babuRadioButtons = document.querySelectorAll(".babu");
  const gopiRadioButtons = document.querySelectorAll(".gopi");
  const karidasRadioButtons = document.querySelectorAll(".karidas");
  const jsonRadioButtons = document.querySelectorAll(".json");
  const jacksonRadioButtons = document.querySelectorAll(".jackson");

  const bhuviAttendance = extractAttendance(bhuviRadioButtons);
  const hariAttendance = extractAttendance(hariRadioButtons);
  const babuAttendance = extractAttendance(babuRadioButtons);
  const gopiAttendance = extractAttendance(gopiRadioButtons);
  const karidasAttendance = extractAttendance(karidasRadioButtons);
  const jsonAttendance = extractAttendance(jsonRadioButtons);
  const jacksonAttendance = extractAttendance(jacksonRadioButtons);

  const attendanceRecord = {
    date: date,
    bhuvi: bhuviAttendance,
    hari: hariAttendance,
    babu: babuAttendance,
    gopi: gopiAttendance,
    karidas: karidasAttendance,
    json: jsonAttendance,
    jackson: jacksonAttendance,
  };
  console.log(attendanceRecord);

  localStorage.setItem(date, JSON.stringify(attendanceRecord));

  axios
    .post("http://localhost:3000/add-attendence", attendanceRecord)
    .then(() => {
      form.innerHTML = "";
      getAttendance(date);
    });
});

function extractAttendance(radiobuttons) {
  for (let button of radiobuttons) {
    if (button.checked) {
      return button.value;
    }
  }
}
function getAttendance(date) {
  axios.get(`http://localhost:3000/get-attendance/${date}`).then((res) => {
    const attendance = res.data;
    console.log(attendance);
    showAttendance(attendance);
  });
}
// == "present"?<span>&#9989</span>:<span>&#10060</span>
function showAttendance(attendance) {
  displayAttendance.innerHTML = `
    bhuvi:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
      attendance.bhuvi == "present"
        ? `<span>&#9989</span>`
        : `<span>&#10060</span>`
    } <br>
    hari:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
      attendance.hari == "present"
        ? `<span>&#9989</span>`
        : `<span>&#10060</span>`
    } <br>
    babu:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
      attendance.babu == "present"
        ? `<span>&#9989</span>`
        : `<span>&#10060</span>`
    } <br>
    gopi: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${
      attendance.gopi == "present"
        ? `<span>&#9989</span>`
        : `<span>&#10060</span>`
    } <br>
    karidas:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
      attendance.karidas == "present"
        ? `<span>&#9989</span>`
        : `<span>&#10060</span>`
    } <br>
    json: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${
      attendance.json == "present"
        ? `<span>&#9989</span>`
        : `<span>&#10060</span>`
    } <br>
    jackson:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${
      attendance.jackson == "present"
        ? `<span>&#9989</span>`
        : `<span>&#10060</span>`
    }`;
}
