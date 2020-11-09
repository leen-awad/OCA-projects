function openNav() {
  document.getElementById("myNav").style.display = "block";
}
function closeNav() {
  document.getElementById("myNav").style.display = "none";
}
// select everything
// select the todo-form
const todoAddButton = document.querySelector('.add-button');
const todoDeleteAllButton = document.querySelector('.delete-all-button');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.todo-items');
// array which stores every todos
let todos = [];
// add an eventListener on form, and listen for submit event
todoAddButton.addEventListener('click', function(event) {
  addTask(todoInput.value); // call addTask function with current value of input box 
});
// function to add task
function addTask(task) {
  // if task is not empty
  if (task !== '') {
    // make a todo object, which has id, name, and completed properties
    const todo = {
      id: Date.now(),
      name: task,
      completed: false
    };
    // then add it to todos array
    todos.push(todo);
    setToLocalStorage(todos); // then store it in localStorage
    // finally clear the input box value
    todoInput.value = '';
  }
}
// function to render given todos to screen
function renderTodos(todos) {
  // clear everything inside <ul> with class=todo-items
  todoItemsList.innerHTML = '';
  // run through each item inside todos
  todos.forEach(function(item) {
    // check if the item is completed
    const checked = item.completed ? 'checked': null;
    // make a <li> element and fill it
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (item.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // finally add the <li> to the <ul>
    todoItemsList.append(li);
  });
}
// function to add todos to local storage
function setToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}
// function helps to get everything from local storage
function getFromLocalStorage() {
  const dataString = localStorage.getItem('todos');
  // if reference exists
  if (dataString) {
    // converts back to array and store it in todos array
    todos = JSON.parse(dataString);
    renderTodos(todos);
  }
}
// toggle the value to completed and not completed
function toggle(id) {
  todos.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });
  setToLocalStorage(todos);
}
// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });
  // update the localStorage
  setToLocalStorage(todos);
}
// deletes all todo tasks from todos array, then updates localstorage and renders updated list to screen
function deleteAllTodos() {
  // filters out the <li> with the id and updates the todos array
  todos = [];
  // update the localStorage
  setToLocalStorage(todos);
}
window.onload = function(){
  // initially get everything from localStorage
  getFromLocalStorage();
  // after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
  todoItemsList.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
      // toggle the state
      toggle(event.target.parentElement.getAttribute('data-key'));
    }
    // check if that is a delete-button
    if (event.target.classList.contains('delete-button')) {
      // get id from data-key attribute's value of parent <li> where the delete-button is present
      deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
  });
  todoDeleteAllButton.addEventListener("click", function(event){
    deleteAllTodos();
  })
};

let backgroudSession = sessionStorage.getItem('background');
let fontFamilySession = sessionStorage.getItem('font-family');
let fontColorSession = sessionStorage.getItem('color');

if(backgroudSession != null){
  if(backgroudSession == "white"){
    document.body.style.background =  `background: linear-gradient(
      to right,
      rgba(201, 195, 195, 0.726),
      rgba(219, 126, 50, 0.6)
    )`;
  }else{
  document.body.style.background = sessionStorage.getItem('background');
  }
}

if(fontFamilySession != null){
  $(document).ready(function(){
    $("body,label").css("font-family",fontFamilySession);
  });
}

if(fontColorSession != null){
  $(document).ready(function(){
    $("label , p").css("color",fontColorSession);
  });
  if(fontColorSession == "#db6400"){
    $(document).ready(function(){
      $("p").css("color",'white');
    });
  }
}

