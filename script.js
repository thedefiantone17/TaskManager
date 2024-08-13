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

// console.log(delBtn, addBtn, allBtn, inputSearchBar, searchBtn, tktAdder, tktPriorityBox, tktContainer, priorityColor, allBoxes);

// variable created to stpre color on which border is present / highlighted
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
  // console.log("clicked");
  tktAdder.classList.toggle("noDisplay");
});

// selecting the border for the priority color of the ticket / task
tktPriorityBox.addEventListener("click", function (e) {
  let clickedBox = e.target;
  // console.log(clickedBox);

  if (clickedBox.classList[0] == "box") {
    allBoxes.forEach(function (box) {
      box.classList.remove("border");
    });

    taskColor = clickedBox.classList[1];

    clickedBox.classList.add("border");
    // console.log(taskColor);
  }
});

tkttextPart.addEventListener("keydown", function (e) {
  // console.log(e);
  // console.log(e.key);

  if (e.key == "Enter") {
    let taskObj = {
      task: tkttextPart.value,
      color: taskColor,
      id: Date.now(),
    };
    // console.log(taskObj);

    // pushing the object to the array
    taskArray.push(taskObj);
    localStorage.setItem("TaskManager" , JSON.stringify(taskArray))

    // clearing text
    tkttextPart.value = "";

    tktAddfn(taskArray);
    localStorage.setItem("TaskManager" , JSON.stringify(taskArray));

    // closing ticket / task
    addBtn.click();
  }
});

// delete functionality
delBtn.addEventListener("click", function () {
  // showing the active state and toggling it
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

    ticket.innerHTML = `<div class="taskColor ${color}"></div>
            <div class="taskText">
                <p class="editTask" contenteditable='true'>${task}</p>
            </div>

            <span class="lock">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"
                    fill="currentColor">
                    <path
                        d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM7 11V13H9V11H7ZM7 14V16H9V14H7ZM7 17V19H9V17H7Z">
                    </path>
                </svg>
            </span>`;

    let lockBtn = ticket.querySelector(".lock");
    let lock = true;

    // edit task
    let editTask = ticket.querySelector(".editTask");

    lockBtn.addEventListener("click", function () {
      if (lock == true) {
        lockBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="30" height="30" fill="currentColor"><path d="M7 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C14.7405 2 17.1131 3.5748 18.2624 5.86882L16.4731 6.76344C15.6522 5.12486 13.9575 4 12 4C9.23858 4 7 6.23858 7 9V10ZM5 12V20H19V12H5ZM10 15H14V17H10V15Z"></path></svg>`;

        editTask.setAttribute("contenteditable", "true");
      } else {
        lockBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"
                    fill="currentColor">
                    <path
                        d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM7 11V13H9V11H7ZM7 14V16H9V14H7ZM7 17V19H9V17H7Z">
                    </path>
                </svg>`;

        let updateTask = editTask.innerHTML;

        arr[i].task = updateTask;

        localStorage.setItem("TaskManager" , JSON.stringify(taskArray))

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
        localStorage.setItem("TaskManager" , JSON.stringify(taskArray))
        // console.log(taskArray);
      }
    });

    // colorStrip functionality
    let colorStrip = ticket.querySelector(".taskColor");

    colorStrip.addEventListener("click", function () {
      let prevColor = arr[i].color;
      // console.log(prevColor);
      let prevIdx = colorsArray.findIndex(function (color) {
        return color == prevColor;
      });
      let nextIdx = (prevIdx + 1) % 4;
      // console.log(colorsArray[nextIdx]);

      // update on UI
      colorStrip.classList.remove(prevColor);
      colorStrip.classList.add(colorsArray[nextIdx]);

      // update on taskArray
      arr[i].color = colorsArray[nextIdx];
      localStorage.setItem("TaskManager" , JSON.stringify(taskArray))
    });

    tktContainer.appendChild(ticket);
  }
}

priorityColor.addEventListener("click", function (e) {
  let clickedBox = e.target;

  if (clickedBox.classList[0] == "box") {
    // console.log(clickedBox.classList[1]);
    let color = clickedBox.classList[1];
    let filteredArray = taskArray.filter(function (taskObj) {
      return taskObj.color == color;
    });
    tktAddfn(filteredArray);
  }
});

// views all the tickets present in the task array
allBtn.addEventListener("click", function (params) {
  tktAddfn(taskArray);
});

searchBtn.addEventListener("click", function () {
  // console.log("clicked");
  let searchQuery = inputSearchBar.value;
  inputSearchBar.value = "";
  let filteredArray = taskArray.filter(function (taskObj) {
    return taskObj.task.toLowerCase().includes(searchQuery.toLowerCase());
  });

  tktAddfn(filteredArray);
});
