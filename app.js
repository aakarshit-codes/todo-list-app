const taskInp = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

/* toggles addTask function when button is clicked */
addTaskBtn.addEventListener('click', addTask);

/* calls the loadTask function */
window.addEventListener('load', loadTasks);

/* creates list element taking in text from the input as parameter */
function createListEle(taskTxt) {
    const newTask = document.createElement('li');
    const deleBtn = document.createElement('button');

    /* adds new task and delete button */
    newTask.textContent = taskTxt;
    deleBtn.textContent = 'delete';

    /* deletes task from the list */
    deleBtn.addEventListener('click', () => {
        newTask.remove();
        saveTasks();
    })

    /* appends delete button to the newTask element */
    newTask.appendChild(deleBtn);
    /* appends the newTask element to the list */
    taskList.appendChild(newTask);
}

function addTask() {
    /*  return if no input */
    if (taskInp.value === '') return; 

    const taskTxt = taskInp.value;
    createListEle(taskTxt);

    /* clears the input field */
    taskInp.value = '';
    saveTasks();
}

function saveTasks() {
    /* empty array to store tasks */
    const tasks = [];

    /* 
    traversing through the list elements and adding the text part to the tasks array */
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push(task.firstChild.textContent);
    });
    
    /* 
    converting the tasks to json string and then storing it in browser under the key tasks 
    */
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* loads the tasks from the local memory when the page is reloaded */
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(taskTxt => {
            createListEle(taskTxt);
        })
    }
}