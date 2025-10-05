// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array from Local Storage or empty
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to load tasks from Local Storage
    function loadTasks() {
        tasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task");
            return;
        }

        // Create a new list item and set its text content
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a Remove button and style it using classList.add
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Set up the event listener to remove the task on click
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            // Remove task from tasks array and update Local Storage
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        // Append the Remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Add the task to the tasks array
        tasks.push(taskText);
        // Save updated tasks to Local Storage if save is true
        if (save) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Load existing tasks from Local Storage on page load
    loadTasks();

    // Attach event listener to Add Task button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
        } else {
            alert("Please enter a task");
        }
    });

    // Allow adding tasks by pressing the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
            } else {
                alert("Please enter a task");
            }
        }
    });
});
