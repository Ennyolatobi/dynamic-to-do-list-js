document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask(taskText) {
    if (!taskText) {
      taskText = taskInput.value.trim();
    }
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = function () {
      taskList.removeChild(li);
      saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    saveTasks();
  }

  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach(task => addTask(task));
});
