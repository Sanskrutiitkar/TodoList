const input = document.getElementById('input');
const submit = document.getElementById('submitButton'); 
const taskTableBody = document.getElementById('taskTableBody');
const completedTableBody = document.getElementById('completedTableBody');
const taskarray = [];
const completedtask = [];

submit.addEventListener('click', (event) => {
    event.preventDefault();

    let todo = input.value.trim(); 

    if (taskarray.includes(todo) || todo === '') {
        alert('Task already present or empty task!'); 
        input.value = '';
        return;
    } 

    taskarray.push(todo);        
    createTaskRow(todo, taskTableBody);
    input.value = '';
});

function createTaskRow(task, tableBody) {
    const newRow = document.createElement('tr');
    const taskCell = document.createElement('td');
    taskCell.innerText = task;
    //tr>td
    newRow.appendChild(taskCell);

    const actionCell = document.createElement('td');
    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.className = 'btn btn-success btn-sm';
    completeButton.onclick = () => {
        completeTask(task, newRow, tableBody, completedTableBody);
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.onclick = () => {
        deleteTask(task,newRow,tableBody);
    };

    actionCell.appendChild(completeButton);
    actionCell.appendChild(deleteButton);
    newRow.appendChild(actionCell);
    tableBody.appendChild(newRow);
}

function completeTask(task, row, currentTableBody, newTableBody) {
    currentTableBody.removeChild(row);
    taskarray.splice(taskarray.indexOf(task), 1);
    completedtask.push(task);
    createCompletedTaskRow(task, newTableBody);
}

function createCompletedTaskRow(task, tableBody) {
    const newRow = document.createElement('tr');
    const taskCell = document.createElement('td');
    taskCell.innerText = task;
   taskCell.style.textDecoration = 'line-through';
    newRow.appendChild(taskCell);

    const actionCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.onclick = () => {
        deleteCompletedTask(task, newRow, tableBody);
    };

    const completeButton = document.createElement('button');
    completeButton.innerText = 'Mark not done';
    completeButton.className = 'btn btn-success btn-sm';
    completeButton.onclick = () => {
        MarkNotDone(task, newRow, tableBody, taskTableBody);
    };

    actionCell.appendChild(completeButton);
    actionCell.appendChild(deleteButton);
    newRow.appendChild(actionCell);
    tableBody.appendChild(newRow);
}

function MarkNotDone(task, row, currentTableBody, newTableBody) {
   
    const taskIndex = completedtask.indexOf(task);
    currentTableBody.removeChild(row);
    completedtask.splice(taskIndex, 1);  
    taskarray.push(task);
    createTaskRow(task, newTableBody);

}

function deleteCompletedTask(task, row, tableBody) {
    tableBody.removeChild(row);
    taskarray.splice(taskarray.indexOf(task), 1);
}

function deleteTask(task, row, tableBody) {
    
    const taskIndex = taskarray.indexOf(task);
    taskarray.splice(taskIndex, 1); 
    tableBody.removeChild(row);
}