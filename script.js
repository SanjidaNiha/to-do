// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('show-tasks-btn').addEventListener('click', showTasks);
document.getElementById('toggle-guide-btn').addEventListener('click', toggleGuide);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const tasks = getTasksFromStorage();
        tasks.push(taskText);
        saveTasksToStorage(tasks);
        taskInput.value = '';
        taskInput.focus();
        addTaskToList(taskText); // Add task to the list immediately after adding
    }
}

function showTasks() {
    const taskList = document.getElementById('task-list');
    taskList.classList.toggle('hidden');

    if (!taskList.classList.contains('hidden')) {
        // Reload tasks every time the list is shown
        taskList.innerHTML = '';
        const tasks = getTasksFromStorage();
        tasks.forEach(task => addTaskToList(task));
    }
}

function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.innerHTML = `${task} <button class="done-btn">✓</button>`; // Fixed template literal syntax
    taskList.appendChild(li);

    li.querySelector('.done-btn').addEventListener('click', () => {
        removeTask(task);
        li.remove();
    });
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(t => t !== task);
    saveTasksToStorage(updatedTasks);
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => addTaskToList(task));
}

function toggleGuide() {
    const userGuide = document.getElementById('user-guide');
    userGuide.classList.toggle('hidden');
    const toggleGuideBtn = document.getElementById('toggle-guide-btn');
    toggleGuideBtn.textContent = userGuide.classList.contains('hidden') ? 'Show User Guide' : 'Hide User Guide';
}
