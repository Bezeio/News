"use strict";
const addBtn = document.getElementById("btn-add");
const todoListContainer = document.getElementById("todo-list");
const inputTask = document.getElementById("input-task");

const KEY = "TODO_LIST";
let todoList = getFromStorage(KEY) || [];
let currentUser = getFromStorage("currentUser") || [];

addBtn.addEventListener("click", function () {
  let todoInput = {
    task: inputTask.value.trim(),
    owner: currentUser.username,
    isDone: false,
  };
  if(!currentUser.username){
    alert('Làm ơn đăng nhập trước')
    return
  }
  if (todoInput.task !== "") {
    const newTask = new Task(todoInput.task, todoInput.owner, todoInput.isDone);
    todoList.push(newTask);
    saveToStorage(currentUser.username, JSON.stringify(todoList)); //save todo list in this current username 
    renderTable()
  }
});

const renderTable = () => {
  todoListContainer.innerHTML = "";
  for (let todo of todoList) {
    const row = document.createElement("li");
    row.innerHTML = `
        <li>
        ${todo.task}
        <span class="close">×</span>
    </li>`;
    
    row.addEventListener('click',()=>{
      todo.isDone = !todo.isDone; // Toggle the isDone status
      saveToStorage(KEY, JSON.stringify(todoList));
      row.classList.toggle('checked', todo.isDone);
        
    })
    const closeButton = row.querySelector('.close')
    //Use splice to delete todo
    closeButton.addEventListener('click', ()=>{
        row.remove()
        const index = todoList.indexOf(todo)
        todoList.splice(index, 1);
        saveToStorage(KEY, JSON.stringify(todoList));

    })
    row.classList.toggle('checked', todo.isDone); // Apply the isDone status on page load
    todoListContainer.appendChild(row)
  }
};

// Call renderTable to display the initial todo list
renderTable()
