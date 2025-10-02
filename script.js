document.addEventListener('DOMContentLoaded', function() {
  // Select DOM elements for reuse
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a task to the list and optionally save it to Local Storage
  function addTask(taskText = taskInput.value.trim(), save = true) {
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item and remove button
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // Remove task from DOM and Local Storage on button click
    removeButton.onclick = function() {
      taskList.removeChild(li);

      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const updatedTasks = storedTasks.filter(task => task !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Save to Local Storage if applicable
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));

      // Only clear input if task was newly added by user
      taskInput.value = '';
    }
  }

  // Load stored tasks from Local Storage and display them on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false means don’t save again
  }

  // Call loadTasks when the page is ready to populate existing tasks
  loadTasks();

  // Attach event handlers for adding tasks by button click or pressing Enter
  addButton.addEventListener('click', () => addTask());

  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
