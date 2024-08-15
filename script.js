// selecting controls
let delBtn = document.querySelector(".delete");
let addBtn = document.querySelector(".add");
let allBtn = document.querySelector(".all");
let inputSearchBar = document.querySelector(".inputSearch");
let searchBtn = document.querySelector(".srchBtn");
let tktAdder = document.querySelector(".ticketAdder");
let tktPriorityBox = document.querySelector(".ticketPriority");
let tkttextPart = document.querySelector(".textPart");
let tktContainer = document.querySelector(".ticketContainer");
let priorityColor = document.querySelector(".priorityColor");
let allBoxes = document.querySelectorAll(".ticketPriority .box");

// variable created to store color on which border is present / highlighted
let taskColor = "red";

// created an array to hold the ticket objs
let taskArray = [];

// color Array
colorsArray = ["red", "blue", "green", "black"];

// delete state
activeDelete = false;

// local storage retrieve
let oldData = localStorage.getItem("TaskManager");

if (oldData) {
  taskArray = [...JSON.parse(oldData)];
  tktAddfn(taskArray);
}

// add button for adding a ticket / task
addBtn.addEventListener("click", function () {
  tktAdder.classList.toggle("noDisplay");
});

// selecting the border for the priority color of the ticket / task
tktPriorityBox.addEventListener("click", function (e) {
  let clickedBox = e.target;

  if (clickedBox.classList[0] == "box") {
    allBoxes.forEach(function (box) {
      box.classList.remove("border");
    });

    taskColor = clickedBox.classList[1];
    clickedBox.classList.add("border");
  }
});

tkttextPart.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    let taskObj = {
      task: tkttextPart.value,
      color: taskColor,
      id: Date.now(),
    };

    taskArray.push(taskObj);
    localStorage.setItem("TaskManager", JSON.stringify(taskArray));

    tkttextPart.value = "";
    tktAddfn(taskArray);
    addBtn.click();
  }
});

// delete functionality
delBtn.addEventListener("click", function () {
  activeDelete = !activeDelete;
  delBtn.classList.toggle("red");
});

// adding ticket in the ticket container
function tktAddfn(arr) {
  tktContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let ticket = document.createElement("div");
    ticket.classList.add("ticket");

    let { color, task, id } = arr[i];

    ticket.innerHTML = `
      <div class="taskColor ${color}"></div>
      <div class="taskText">
        <p class="editTask" contenteditable='true'>${task}</p>
      </div>
      
      <span class="add-to-calendar"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg></span>

      <span class="lock">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
          <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM7 11V13H9V11H7ZM7 14V16H9V14H7ZM7 17V19H9V17H7Z"></path>
        </svg>
      </span>`;

    let lockBtn = ticket.querySelector(".lock");
    let lock = true;

    let editTask = ticket.querySelector(".editTask");

    lockBtn.addEventListener("click", function () {
      if (lock == true) {
        lockBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path>
          </svg>`;
        editTask.setAttribute("contenteditable", "true");
      } else {
        lockBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM7 11V13H9V11H7ZM7 14V16H9V14H7ZM7 17V19H9V17H7Z"></path>
          </svg>`;
        let updateTask = editTask.innerHTML;
        arr[i].task = updateTask;
        localStorage.setItem("TaskManager", JSON.stringify(taskArray));
        editTask.setAttribute("contenteditable", "false");
      }
      lock = !lock;
    });

    ticket.addEventListener("dblclick", function () {
      if (activeDelete == true) {
        tktContainer.removeChild(ticket);
        let filteredArray = taskArray.filter(function (taskObj) {
          return taskObj.id != id;
        });
        taskArray = [...filteredArray];
        localStorage.setItem("TaskManager", JSON.stringify(taskArray));
      }
    });

    let colorStrip = ticket.querySelector(".taskColor");

    colorStrip.addEventListener("click", function () {
      let prevColor = arr[i].color;
      let prevIdx = colorsArray.findIndex(function (color) {
        return color == prevColor;
      });
      let nextIdx = (prevIdx + 1) % 4;

      colorStrip.classList.remove(prevColor);
      colorStrip.classList.add(colorsArray[nextIdx]);

      arr[i].color = colorsArray[nextIdx];
      localStorage.setItem("TaskManager", JSON.stringify(taskArray));
    });

    // Add to Calendar functionality
    let addToCalendarBtn = ticket.querySelector(".add-to-calendar");

    addToCalendarBtn.addEventListener("click", function () {
      const eventTitle = "Task Reminder";
      const eventDescription = "This is a reminder for your task.";
      const eventLocation = "";
      const startTime = new Date().toISOString(); // Set the current time or any desired time
      const endTime = new Date(new Date().getTime() + 3600000).toISOString(); // One hour later

      const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//Your Application//EN
BEGIN:VEVENT
UID:${new Date().getTime()}@yourdomain.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}
DTSTART:${startTime.replace(/[-:]/g, "").split(".")[0]}
DTEND:${endTime.replace(/[-:]/g, "").split(".")[0]}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent.trim()], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "reminder.ics";
      link.click();
      URL.revokeObjectURL(url);
    });

    tktContainer.appendChild(ticket);
  }
}

priorityColor.addEventListener("click", function (e) {
  let clickedBox = e.target;

  if (clickedBox.classList[0] == "box") {
    let color = clickedBox.classList[1];
    let filteredArray = taskArray.filter(function (taskObj) {
      return taskObj.color == color;
    });
    tktAddfn(filteredArray);
  }
});

allBtn.addEventListener("click", function () {
  tktAddfn(taskArray);
});

searchBtn.addEventListener("click", function () {
  let searchQuery = inputSearchBar.value;
  inputSearchBar.value = "";
  let filteredArray = taskArray.filter(function (taskObj) {
    return taskObj.task.toLowerCase().includes(searchQuery.toLowerCase());
  });

  tktAddfn(filteredArray);
});
