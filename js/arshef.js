const dateMonth = document.querySelector(".date-month");

const inputYear = document.querySelector(".input-year");
const inputMonth = document.querySelector(".input-month");
const btnSearch = document.querySelector(".btn-search");

const titleMonth = document.querySelector(".title-month");
const totalDue = document.querySelector(".totalDue");
const totalPaid = document.querySelector(".totalPaid");
const totalRemaining = document.querySelector(".totalRemaining");

const totalWorkers = document.querySelector(".totalWorkers");
const tableBody = document.querySelector(".table-body");

const basu_url = "https://worker-backend-2.onrender.com/api";

addEventListener("load", getMonth);
// GET CURNT MONTH
async function getMonth() {
  try {
    const response = await fetch(`${basu_url}/archive/month`);
    const data = await response.json();

    if (data.success) {
      displaydata(data);
    } else {
      console.log(data.error);
    }
  } catch (error) {
    console.log(error);
  }
}

// STRAT FUNCTION DISPLAY DATA

function displaydata(data) {
  dateMonth.innerHTML = `  
  عرض مصروفات الشهر من <span>${data.data.month.startDate}</span> الي
              <span>${data.data.month.endDate}</span>`;
  titleMonth.innerHTML = `
        <h3>${data.data.month.monthName} ${data.data.month.year}</h3>
        <h6>
            <span class="bold">${data.data.month.startDate}</span> - <span>${data.data.month.endDate}</span>
        </h6>
    `;
  totalDue.innerHTML = `
        <h3>اجمالي المستحق</h3>
              <h4 class="text-center text-primary">
                <span class="bold">${data.data.summary.totalDue}</span> <span>ريال</span>
              </h4>
    `;
  totalPaid.innerHTML = `
         <h3>اجمالي المدغوع</h3>
              <h4 class="text-center text-warning">
                <span class="bold">${data.data.summary.totalPaid}</span> <span>ريال</span>
              </h4>
    `;
  totalRemaining.innerHTML = `
      <h3>اجمالي المتبقي</h3>
              <h4 class="text-danger">
                <span class="bold">${data.data.summary.totalRemaining}</span> <span>ريال</span>
              </h4>
    `;
  totalWorkers.innerHTML = `${data.data.summary.totalWorkers} عامل`;

  let tableContent = "";
  data.data.workers.forEach((worker) => {
    tableContent += `
            <tr>
              <td>${worker.name}</td>
              <td>${worker.dailyWage}</td>
              <td>${worker.attendance.presentDays}</td>
              <td>${worker.attendance.absentDays}</td>
              <td>${worker.attendance.grossEarned}</td>
              <td>${worker.financial.totalDiscounts} <span>ريال</span></td>
              <td>${worker.financial.rewards} <span>ريال</span></td>
              <td>${worker.financial.totalDue} <span>ريال</span></td>
              <td>${worker.financial.paid} <span>ريال</span></td>
              <td>${worker.financial.remaining} <span>ريال</span></td>
            </tr>
        `;
  });
  tableBody.innerHTML = tableContent;
}

btnSearch.addEventListener("click", searchMonths);
async function searchMonths() {
  if (
    inputYear.value == "" ||
    inputYear.value < 2026 ||
    inputMonth.value == ""
  ) {
    toastify("ادخل تاريخ صالح", "#dc3545");
    return;
  }

  try {
    const response = await fetch(
      `${basu_url}/archive/month?year=${inputYear.value}&month=${inputMonth.value}`,
    );
    const data = await response.json();
    if (data.success) {
      displaydata(data);
    } else {
      console.log(data);
      toastify("ادخل تاريخ صالح", "#dc3545");
    }
  } catch (error) {
    console.log(error);
  }
}
