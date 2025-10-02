// script.js
// To-Do List with Local Storage persistence

document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage or start with empty array
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  /**
   * Save the in-memory tasks array to localStorage (serialized as JSON).
   */
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  /**
   * Create a DOM <li> element for a task object and append to the list.
   * @param {{id: string, text: string}} task
   */
  function createTaskElement(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    // Text node (use a span so we keep control of layout)
    const span = document.createElement('span');
    span.textContent = task.text;
    li.appendChild(span);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => removeTask(task.id));
    li.appendChild(removeBtn);

    taskList.appendChild(li);
  }

  /**
   * Add a new task.
   * If taskText is provided (string) it will be used. Otherwise it reads from the input field.
   * The `save` flag controls whether to persist to localStorage (useful to avoid double-saving during load).
   * @param {string} [taskText]
   * @param {boolean} [save=true]
   */
  function addTask(taskText, save = true) {
    // If a string was passed, use it; otherwise read from input
    const text = (typeof taskText === 'string') ? taskText.trim() : taskInput.value.trim();

    // Validate
    if (!text) {
      alert('Please enter a task.');
      return;
    }

    // Task object with a simple unique id
    const task = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      text: text
    };

    // Render to DOM
    createTaskElement(task);

    // Save to memory + localStorage if requested
    if (save) {
      tasks.push(task);
      saveTasks();
    }

    // Clear input when added via input
    if (typeof taskText !== 'string') {
      taskInput.value = '';
    }
  }

  /**
   * Remove a task by id (both from DOM and from localStorage-backed array).
   * @param {string} id
   */
  function removeTask(id) {
    // Remove DOM element
    const li = taskList.querySelector(`li[data-id="${id}"]`);
    if (li) li.remove();

    // Remove from tasks array and persist
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
  }

  /**
   * Load tasks from the tasks array (which was initialized from localStorage).
   * This renders each saved task to the DOM without re-saving them again.
   */
  function loadTasks() {
    tasks.forEach(task => createTaskElement(task));
  }

  // Initialize app: render saved tasks
  loadTasks();

  // Event listeners
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
