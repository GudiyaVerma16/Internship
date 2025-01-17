// document.addEventListener('DOMContentLoaded', () => {
//   // DOM Elements
//   const taskInput = document.getElementById('task-input');
//   const addTaskBtn = document.getElementById('add-task-btn');
//   const clearTasksBtn = document.getElementById('clear-tasks-btn');
//   const searchTaskInput = document.getElementById('search-task');
//   const clearSearchBtn = document.getElementById('clear-search-btn');
//   const taskList = document.getElementById('task-list');

//   // Load tasks from LocalStorage
//   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//   // Function to render tasks
//   function renderTasks(filteredTasks = tasks) {
//     taskList.innerHTML = '';
//     filteredTasks.forEach((task, index) => {
//       const li = document.createElement('li');
//       li.textContent = task;

//       // Delete button
//       const deleteBtn = document.createElement('button');
//       deleteBtn.textContent = 'X';
//       deleteBtn.addEventListener('click', () => deleteTask(index));
//       li.appendChild(deleteBtn);

//       taskList.appendChild(li);
//     });
//   }

//   // Add a new task
//   function addTask() {
//     const task = taskInput.value.trim();
//     if (task) {
//       tasks.push(task);
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//       taskInput.value = '';
//       renderTasks();
//     }
//   }

//   // Delete a task
//   function deleteTask(index) {
//     tasks.splice(index, 1);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     renderTasks();
//   }

//   // Clear all tasks
//   function clearTasks() {
//     tasks = [];
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     renderTasks();
//   }

//   // Clear search input
//   function clearSearch() {
//     searchTaskInput.value = '';
//     renderTasks();
//   }

//   // Search tasks
//   function searchTasks() {
//     const searchText = searchTaskInput.value.toLowerCase();
//     const filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchText));
//     renderTasks(filteredTasks);
//   }

//   // Event Listeners
//   addTaskBtn.addEventListener('click', addTask);
//   clearTasksBtn.addEventListener('click', clearTasks);
//   clearSearchBtn.addEventListener('click', clearSearch);
//   searchTaskInput.addEventListener('input', searchTasks);

//   // Initial render
//   renderTasks();
// });

// Select DOM elements
const taskInput = document.getElementById("task-input");
const searchTaskInput = document.getElementById("search-task");
const addTaskBtn = document.getElementById("add-task-btn");
const clearTasksBtn = document.getElementById("clear-tasks-btn");
const taskList = document.getElementById("task-list");

// Retrieve tasks from LocalStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks(filter = "") {
  taskList.innerHTML = "";
  tasks
    .filter((task) => task.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task;

      // Add delete button for each task
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => deleteTask(index);

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
}

// Function to add a task
function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value = "";
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Function to clear all tasks
function clearTasks() {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Function to search for tasks
searchTaskInput.addEventListener("input", () => {
  renderTasks(searchTaskInput.value);
});

// Event listeners
addTaskBtn.addEventListener("click", addTask);
clearTasksBtn.addEventListener("click", clearTasks);

// Initial render of tasks
renderTasks();
