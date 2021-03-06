const addButton = document.getElementById("add-button");
const textInput = document.getElementById("text-input");
const numberOfTodo = document.getElementById("counter");
const viewSection = document.getElementById("view");
const counter = document.getElementById("counter");
const sortButton = document.getElementById("sort-button");
let storedCounter = localStorage.getItem("counter");
let localJson = localStorage.getItem("my-todo");
const todoList = [];
let inputValue;
let jsonList = [];

//Set counter to stay on refresh
if (storedCounter) {
  counter.innerText = storedCounter;
}

//Update counter on every click
addButton.onclick = function () {
  const key = "counter";
  let value = Number(counter.innerText);
  value++;
  counter.innerText = Number(counter.innerText) + 1;
  localStorage.setItem(key, value);
};

//Whenever you reload the list isn't reset
if (typeof localJson === "string") {
  jsonList = JSON.parse(localJson);
  listTodos();
}

//Adds the item to the array and displays it
addButton.addEventListener("click", (e) => {
  inputValue = textInput.value;
  const inputObject = convertValueToObject(inputValue);
  const todoJson = JSON.stringify(inputObject);
  jsonList.push(inputObject);
  localStorage.setItem("my-todo", JSON.stringify(jsonList));
  viewSection.append(itemObjectToDiv(inputObject));
});

//Removes text from input on click
addButton.addEventListener("click", (e) => {
  textInput.value = "";
});

//On click sorts the array
sortButton.addEventListener("click", (e) => {
  sortArrayByPriority(jsonList);
  localStorage.setItem("my-todo", JSON.stringify(jsonList));
  for (let i = 0; i < jsonList.length; i++) {
    viewSection.removeChild(document.querySelectorAll(".todo-container")[0]);
  }
  for (let i = 0; i < jsonList.length; i++) {
    viewSection.append(itemObjectToDiv(jsonList[i]));
  }
});

//---------------------------------------Functions---------------------------------------//

function convertValueToObject(value) {
  const current = new Date();
  const creationTime = current.toLocaleString();
  const priority = document.getElementById("priority-selector").value;
  const myTodoItem = {
    text: value,
    date: creationTime,
    priority: priority,
  };
  return myTodoItem;
}

//Converts the todo item object into a div container
function itemObjectToDiv(myTodoItem) {
  const todoContainer = document.createElement("div");
  const todoPriority = document.createElement("div");
  const todoCreatedAt = document.createElement("div");
  const todoText = document.createElement("div");

  todoContainer.setAttribute("class", "todo-container");
  todoPriority.setAttribute("class", "todo-priority");
  todoCreatedAt.setAttribute("class", "todo-created-at");
  todoText.setAttribute("class", "todo-text");

  todoPriority.innerText = myTodoItem["priority"];
  todoCreatedAt.innerText = myTodoItem["date"];
  todoText.innerText = myTodoItem["text"];

  todoContainer.appendChild(todoText);
  todoContainer.appendChild(todoCreatedAt);
  todoContainer.appendChild(todoPriority);

  return todoContainer;
}

//Loads the list from local storage
function listTodos() {
  const list = JSON.parse(localJson);
  for (let i = 0; i < list.length; i++) {
    const object = list[i];
    viewSection.append(itemObjectToDiv(object));
  }
}

function sortArrayByPriority(array) {
  array.sort(function (a, b) {
    return b.priority - a.priority;
  });
  return array;
}
