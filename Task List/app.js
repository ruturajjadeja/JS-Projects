// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task form
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTask);
	// Filter task event
	filter.addEventListener('keyup', filterTask);
}

// Get Tasks from Local Storage
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(task => {
		// Create li element
		const li = document.createElement('li');
		li.className = 'collection-item';
		// Create text node and append to the li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append link to li
		li.appendChild(link);
		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add Task
function addTask(e) {
	if(taskInput.value) {
		// Create li element
		const li = document.createElement('li');
		li.className = 'collection-item';
		// Create text node and append to the li
		li.appendChild(document.createTextNode(taskInput.value));
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append link to li
		li.appendChild(link);
		// Append li to ul
		taskList.appendChild(li);

		// Store in local storage
		storeTaskInLocalStorage(taskInput.value);

		// Clear input
		taskInput.value = '';
	}

	e.preventDefault();
}

// Store task'
function storeTaskInLocalStorage(task) {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
	if(e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove task from Local Storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove form Local Storage
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach((task, index) => {
		if(taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task
function clearTask() {
	// taskList.innerHTML = '';
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear task from Local Storage
	clearTaskFromLocalStorage();
}

// Clear task from Local Storage
function clearTaskFromLocalStorage() {
	localStorage.clear();
}

// Filter task
function filterTask(e) {
	const text = e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach(task => {
		const item = task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
