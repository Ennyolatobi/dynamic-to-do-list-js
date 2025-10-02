document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // match HTML
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false);
        });
    }

    // Add a task (with optional saving)
    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
        taskInput.value = "";

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Add task on button click
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add task on pressing Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when page loads
    loadTasks();
});
