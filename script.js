// Persisted To-Do List with Local Storage
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage (or start with empty array)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Helper: save the current tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a DOM element for a task (li with text and remove button)
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        // Task text
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When remove is clicked: remove from DOM and update Local Storage
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);

            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        li.appendChild(removeBtn);
        return li;
    }

    /**
     * Add a task to the list.
     * @param {string|null} taskText - If provided, use this text; otherwise read from input.
     * @param {boolean} save - When true, also save the task to Local Storage (set false when loading).
     */
    function addTask(taskText = null, save = true) {
        const text = taskText !== null ? String(taskText).trim() : taskInput.value.trim();

        // If empty and this call originates from a user action, alert and stop.
        if (text === '') {
            if (save) alert('Please enter a task.');
            return;
        }

        // Create and append task element to DOM
        const li = createTaskElement(text);
        taskList.appendChild(li);

        if (save) {
            tasks.push(text);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    }

    function loadTasks() {
        tasks.forEach(task => addTask(task, false)); 
    }

    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
