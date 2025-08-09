// Persisted To-Do List with Local Storage
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to keep tasks in memory and sync with localStorage
    let tasks = [];

    // Save current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage and render them
    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskText => {
            // Pass save = false to avoid saving again while loading
            addTask(taskText, false);
        });
    }

    /**
     * Add a task to the DOM and optionally save it to localStorage.
     * If taskText is omitted (null), read from the input field.
     * @param {string|null} taskText
     * @param {boolean} save - whether to push to tasks array and persist
     */
    function addTask(taskText = null, save = true) {
        // If no taskText provided, take from input
        let text = taskText;
        if (text === null) {
            text = taskInput.value.trim();
            if (text === "") {
                alert("Please enter a task.");
                return;
            }
        }

        // Create list item and remove button
        const li = document.createElement('li');
        li.textContent = text;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // required by automated test

        // Remove handler: remove from DOM and from tasks array, then persist
        removeBtn.addEventListener('click', function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from tasks array (first match)
            const index = tasks.indexOf(text);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        // Append remove button to li, then li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If requested, save this new task to memory and localStorage
        if (save) {
            tasks.push(text);
            saveTasks();
        }

        // Clear input if the task came from the input field
        if (taskText === null) {
            taskInput.value = "";
        }
    }

    // Attach required event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize by loading stored tasks
    loadTasks();
});
