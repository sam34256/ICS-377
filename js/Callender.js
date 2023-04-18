// Initialize calendar with current date
var today = new Date();
var currentYear = today.getFullYear();
var currentMonth = today.getMonth();
updateCalendar(currentYear, currentMonth);

// Listen for form submission
var form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  var year = parseInt(document.querySelector('#year').value);
  var month = parseInt(document.querySelector('#month').value);

  updateCalendar(year, month);
});

// Update calendar with new year and month
function updateCalendar(year, month) {
  // Get number of days in the selected month
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get the first day of the selected month
  var firstDay = new Date(year, month, 1).getDay();

  // Get the last day of the selected month
  var lastDay = new Date(year, month, daysInMonth).getDay();

  // Clear the previous calendar
  var calendarBody = document.querySelector('#calendar-body');
  calendarBody.innerHTML = '';

  // Create table rows and cells for each day of the month
  var tableRow, tableCell;
  var dayCount = 1;

  for (var i = 0; i < 6; i++) {
    tableRow = document.createElement('tr');
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        // Create empty cell for days before the first of the month
        tableCell = document.createElement('td');
        tableRow.appendChild(tableCell);
      } else if (dayCount > daysInMonth) {

// Create empty cell for days after the last of the month
        tableCell = document.createElement('td');
        tableRow.appendChild(tableCell);
      } else {
// Create cell for each day of the month
        tableCell = document.createElement('td');
        tableCell.textContent = dayCount;
        tableRow.appendChild(tableCell);
        dayCount++;
      }
    }
    calendarBody.appendChild(tableRow);
  }
  // Update calendar month and year in the heading
  var calendarHeading = document.querySelector('h1');
  calendarHeading.textContent = `${monthName(month)} ${year}`;
}

// Return month name for a given month number
function monthName(month) {
  var months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  return months[month];
}
function updateCalendar(year, month) {
  // Get number of days in the selected month
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get the first day of the selected month
  var firstDay = new Date(year, month, 1).getDay();

  // Get the last day of the selected month
  var lastDay = new Date(year, month, daysInMonth).getDay();

  // Clear the previous calendar
  var calendarBody = document.querySelector('#calendar-body');
  calendarBody.innerHTML = '';

  // Create table rows and cells for each day of the month
  var tableRow, tableCell;
  var dayCount = 1;

  for (var i = 0; i < 6; i++) {
    tableRow = document.createElement('tr');
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        // Create empty cell for days before the first of the month
        tableCell = document.createElement('td');
        tableRow.appendChild(tableCell);
      } else if (dayCount > daysInMonth) {
        // Create empty cell for days after the last of the month
        tableCell = document.createElement('td');
        tableRow.appendChild(tableCell);
      } else {
        // Create cell for the current day
        tableCell = document.createElement('td');
        tableCell.textContent = dayCount;
        tableRow.appendChild(tableCell);

        // Add events to specific dates
        if (year === 2023 && month === 3 && dayCount === 18) {
          tableCell.classList.add('event');
          tableCell.title = 'Professional Meeting';
        } else if (year === 2023 && month === 3 && dayCount === 23) {
          tableCell.classList.add('event');
          tableCell.title = 'Schedule Review';
        }

        dayCount++;
      }
    }
    calendarBody.appendChild(tableRow);
  }
}

