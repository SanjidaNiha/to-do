document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const showTasksBtn = document.getElementById('show-tasks-btn');
    const taskList = document.getElementById('task-list');
    const toggleGuideBtn = document.getElementById('toggle-guide-btn');
    const userGuide = document.getElementById('user-guide');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const doneBtn = document.createElement('button');
            doneBtn.textContent = '✓';
            doneBtn.className = 'done-btn';
            doneBtn.onclick = () => {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            };
            li.appendChild(doneBtn);
            taskList.appendChild(li);
        });
    };

    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
        }
    });

    showTasksBtn.addEventListener('click', () => {
        taskList.classList.toggle('hidden');
    });

    toggleGuideBtn.addEventListener('click', () => {
        userGuide.classList.toggle('hidden');
        toggleGuideBtn.textContent = userGuide.classList.contains('hidden') ? 'Show User Guide' : 'Hide User Guide';
    });

    renderTasks();
});
