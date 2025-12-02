let tasks = [{ id: 1, text: "" }];
let taskIdCounter = 2;
let sortOrder = "none";
let draggedIndex = null;

const tasksList = document.getElementById("tasksList");
const addButton = document.getElementById("addButton");
const sortButton = document.getElementById("sortButton");

function renderTasks() {
  tasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.draggable = true;
    taskItem.dataset.index = index;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "task-input";
    input.placeholder = "";
    input.value = task.text;

    input.addEventListener("change", (e) => {
      tasks[index].text = e.target.value;
    });

    input.addEventListener("input", (e) => {
      tasks[index].text = e.target.value;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5H17M8 9V15M12 9V15M2 5L3 17C3 18.1046 3.89543 19 5 19H15C16.1046 19 17 18.1046 17 17L18 5M7 5V3C7 2.44772 7.44772 2 8 2H12C12.5523 2 13 2.44772 13 3V5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    deleteBtn.addEventListener("click", () => {
      deleteTask(index);
    });

    taskItem.appendChild(input);
    taskItem.appendChild(deleteBtn);

    taskItem.addEventListener("dragstart", () => {
      draggedIndex = index;
      taskItem.classList.add("dragging");
    });

    taskItem.addEventListener("dragend", () => {
      taskItem.classList.remove("dragging");
      draggedIndex = null;
    });

    taskItem.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    taskItem.addEventListener("drop", (e) => {
      e.preventDefault();
      if (draggedIndex !== null && draggedIndex !== index) {
        const draggedTask = tasks[draggedIndex];
        tasks.splice(draggedIndex, 1);
        tasks.splice(index, 0, draggedTask);
        renderTasks();
      }
    });

    tasksList.appendChild(taskItem);
  });
}

function addTask() {
  tasks.push({ id: taskIdCounter++, text: "" });
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function sortTasks() {
  if (sortOrder === "none" || sortOrder === "desc") {
    sortOrder = "asc";
    tasks.sort((a, b) => a.text.localeCompare(b.text, "az"));
  } else {
    sortOrder = "desc";
    tasks.sort((a, b) => b.text.localeCompare(a.text, "az"));
  }

  if (sortOrder === "desc") {
    sortButton.classList.add("desc");
  } else {
    sortButton.classList.remove("desc");
  }

  renderTasks();
}

addButton.addEventListener("click", addTask);
sortButton.addEventListener("click", sortTasks);

renderTasks();
