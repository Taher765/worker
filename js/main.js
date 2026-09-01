const btnViewOverlay = document.getElementById("view-overlay");
const overlay = document.querySelector(".overlay");
const btnExitOverlayAddWorker = document.querySelector(
  ".btn-exit-overlay-add-worker",
);

const btnAddWorker = document.querySelector(".btn-add-worker");
const addWorkerInput = document.querySelector(".add-worker-input");
const wage = document.querySelector(".wage");

const searchWorker = document.querySelector(".search-worker");
const btnSerchWorker = document.querySelector(".btn-serch-worker");

const searchWeek = document.querySelector("#search-week");
const btnViewWeek = document.querySelector(".view-week");

const btnPrev = document.querySelector(".btnPrev");
const btnNext = document.querySelector(".btn-next");

const titleDate = document.querySelector(".title-date");
const tableHead = document.querySelector(".tableHead");
const tableBody = document.querySelector(".tableBody");

let dateNow = null;
// load date From db
addEventListener("load", getWeek);

// Open And Close Modal Add Worker
btnViewOverlay.addEventListener("click", openModalOverlay);
btnExitOverlayAddWorker.addEventListener("click", colseModalOverlay);
function openModalOverlay() {
  overlay.classList.add("display-overlay");
}
function colseModalOverlay() {
  addWorkerInput.value = "";
  wage.value = "";
  overlay.classList.remove("display-overlay");
}

// Start Function Add Worker From Api
btnAddWorker.addEventListener("click", addWrker);
async function addWrker(e) {
  const body = {
    name: addWorkerInput.value,
    currentWage: wage.value,
  };
  await fetchAddWorker(body);
}

async function fetchAddWorker(body) {
  try {
    const response = await fetch("http://localhost:5000/api/workers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    // ========= Start Toastify
    if (data.success) {
      toastify(`تم اضافه العامل   ${data.data.name}  بنجاح`, "#198754");
      colseModalOverlay();
      await getWeek();
      window.location.reload();
    } else {
      toastify("من فضلك ادخل البيانات  بشكل صحيح", "#dc3545");
    }

    // =========== End Toastify
  } catch (error) {
    console.log(error);
  }
}

// Start Function get data From DB

async function getWeek() {
  try {
    const response = await fetch("http://localhost:5000/api/home");
    const data = await response.json();
    if (data.success) {
      await displayData(data);
    }
  } catch (error) {
    console.log(error);
  }
}

// STRTA FUNCTION DISPLAY (MAIN)
async function displayData(data) {
  titleDate.innerHTML = `جدول الاسبوع من <span><span>${data.data.week.startDate}</span></span> <br />   الي <span>${data.data.week.endDate}</span> `;
  dateNow = data.data.week.startDate;

  tableHead.innerHTML = `
              <tr class="align-middle">
                <th>الاسم</th>
                <th>اليوميه</th>
                <th><span>${data.data?.days[0]?.dayName}</span> <br /><span>${data.data?.days[0]?.date.slice(5)}</span></th>
                <th><span>${data.data?.days[1]?.dayName}</span> <br /><span>${data.data?.days[1]?.date.slice(5)}</span></th>
                <th><span>${data.data?.days[2]?.dayName}</span> <br /><span>${data.data?.days[2]?.date.slice(5)}</span></th>
                <th><span>${data.data?.days[3]?.dayName}</span> <br /><span>${data.data?.days[3]?.date.slice(5)}</span></th>
                <th><span>${data.data?.days[4]?.dayName}</span> <br /><span>${data.data?.days[4]?.date.slice(5)}</span></th>
                <th><span>${data.data?.days[5]?.dayName}</span> <br /><span>${data.data?.days[5]?.date.slice(5)}</span></th>
                <th><span>${data.data?.days[6]?.dayName}</span> <br /><span>${data.data?.days[6]?.date.slice(5)}</span></th>
                <th>حساب الاسبوع</th>
                <th>اجراءات</th>
              </tr>
  `;

  let content = ``;

  const weekEndDate = new Date(data.data?.week.endDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastWeek = weekEndDate < today;

  data.data.workers.forEach((data) => {
    content += `
             <tr >
                <td>${data.worker.name}</td>
                <td>${data.worker.currentWage}</td>
                <td><input onchange="handelAttendance('${data?.worker?._id}' , '${data?.days[0]?.date}' , event)" ${data?.days[0]?.attended ? "checked" : ""} ${isPastWeek ? "disabled" : ""}   type="checkbox" class="form-check-input" /> 
                <br />
                <span>${data.days[0]?.wage ?? data.worker.currentWage}</span>
                </td>
                <td><input onchange="handelAttendance('${data?.worker?._id}' , '${data?.days[1]?.date}' , event)" ${data?.days[1]?.attended ? "checked" : ""}  ${isPastWeek ? "disabled" : ""} type="checkbox" class="form-check-input" /> 
                <br />  
                <span>${data.days[1]?.wage ?? data.worker.currentWage}</span>
                </td>
                <td><input onchange="handelAttendance('${data?.worker?._id}' , '${data?.days[2]?.date}' , event)" ${data?.days[2]?.attended ? "checked" : ""} ${isPastWeek ? "disabled" : ""} type="checkbox" class="form-check-input" /> 
                <br />  
                <span>${data.days[2]?.wage ?? data.worker.currentWage}</span>
                </td>
                <td><input onchange="handelAttendance('${data?.worker?._id}' , '${data?.days[3]?.date}' , event)" ${data?.days[3]?.attended ? "checked" : ""} ${isPastWeek ? "disabled" : ""} type="checkbox" class="form-check-input" /> 
                <br />  
                <span>${data.days[3]?.wage ?? data.worker.currentWage}</span>
                </td>
                <td><input onchange="handelAttendance('${data?.worker?._id}' , '${data?.days[4]?.date}' , event)" ${data?.days[4]?.attended ? "checked" : ""} ${isPastWeek ? "disabled" : ""} type="checkbox" class="form-check-input" /> 
                <br />  
                <span>${data.days[4]?.wage ?? data.worker.currentWage}</span>
                </td>
                <td><input onchange="handelAttendance('${data?.worker?._id}' , '${data?.days[5]?.date}' , event)" ${data?.days[5]?.attended ? "checked" : ""} ${isPastWeek ? "disabled" : ""} type="checkbox" class="form-check-input" /> 
                <br />  
                <span>${data.days[5]?.wage ?? data.worker.currentWage}</span>
                </td>
                <td><input onchange="handelAttendance('${data?.worker?._id}' , '${data?.days[6]?.date}' , event)" ${data?.days[6]?.attended ? "checked" : ""} ${isPastWeek ? "disabled" : ""} type="checkbox" class="form-check-input" /> 
                <br />  
                <span>${data.days[6]?.wage ?? data.worker.currentWage}</span>
                </td>
                <td>${data.summary?.net}</td>
                <td>
                  <button onclick="deleteWroker('${data.worker._id}')" class="btn btn-danger">حذف</button>
                  <a href="profile.html?id=${data.worker._id}" class="btn btn-primary">تفاصيل</a>
                </td>
              </tr>
   `;
  });

  tableBody.innerHTML = content;
}

// START FUNCTION ATTENDANCE
btnViewWeek.addEventListener("click", getWeekByDate);
async function getWeekByDate() {
  const date = await searchWeek.value;

  try {
    if (date) {
      const response = await fetch(
        `http://localhost:5000/api/home/by-date?date=${date}`,
      );
      const data = await response.json();

      if (data.success) {
        displayData(data);
      } else {
        toastify("من فضلك قم بأدخال تاريخ صالح", "#dc3545");
      }
    } else {
      toastify("من فضلك قم بأدخال تاريخ صالح", "#dc3545");
    }
  } catch (error) {
    console.log(error);
    toastify("من فضلك قم بأدخال تاريخ صالح", "#dc3545");
  }
}

// START FUNCTION previous Week
btnPrev.addEventListener("click", previousWeek);
async function previousWeek() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/weeks/previous?from=${dateNow}`,
    );
    const data = await response.json();
    if (data.success) {
      displayData(data);
      searchWeek.value = dateNow;
    }
  } catch (err) {
    console.log(err);
  }
}
// STRAT FUNCTION NEXT WEEK
btnNext.addEventListener("click", nextWeek);
async function nextWeek() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/weeks/next?from=${dateNow}`,
    );
    const data = await response.json();
    if (data.success) {
      displayData(data);
      searchWeek.value = dateNow;
    }
  } catch (err) {
    console.log(err);
  }
}

// Start Function Attendance

async function handelAttendance(workerId, date, checkboxEle) {
  const isChecked = checkboxEle.target.checked;
  const status = isChecked ? "present" : "absent";
  const body = {
    date,
    status,
  };
  try {
    const response = await fetch(
      `http://localhost:5000/api/workers/${workerId}/attendance`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    const data = await response.json();
    if (data.success) {
      toastify("تم تحديث حضور العمال بنجاح ", "#198754");
      getWeek();
    } else {
      toastify("فشلت العمليه من فضلك اعد المحاوله");
      checkboxEle.target.checked = !isChecked;
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
    checkboxEle.target.checked = !isChecked;
  }
}

// Function delete Worker

async function deleteWroker(workerId) {
  try {
    const result = confirm("هل تريد اتمام عمليه حذف العامل ");
    if (result) {
      const response = await fetch(
        `http://localhost:5000/api/workers/${workerId}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();

      if (data.success) {
        toastify(`تم حذف العامل ${data.data.name} بنجاح`, "#198754");
        // Call Function Get Week
        getWeek();
      }
    } else {
      toastify("لم يتم حذف العامل", "#dc3545");
    }
  } catch (error) {
    console.log(error);
  }
}
