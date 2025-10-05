document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Check if the task text is empty
        if (taskText === "") {
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
        };

        // Append the Remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Attach event listener to Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks by pressing the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
