/**
 * Todo list
 */
let todosState = {
  nameInput: '',
  todos: [
    {name: 'hola', checked: true},
    {name: 'chao', checked: false}
  ],
}

// We are using the main script as a module, and in a module
// context the variables are not defined in global scope, so we
// have to bind the 'public' functions and variables to window,
// even if we add event listeners programatically.
window.onAddTodoClick = () => {
  //TODO: transform to action dispatch
  if(todosState.nameInput !== '') {
    todosState.todos.push({name: todosState.nameInput, checked: false});
    todosState.nameInput = '';
    document.getElementById('new-todo-input').value = '';
  }
  renderList();
}

window.handleNameInputChange = () => {
  //TODO: transform to action dispatch
  todosState.nameInput = document.getElementById('new-todo-input').value.trim();
};

window.onDeleteSelectedClick = () => {
  todosState.todos = todosState.todos.filter(t => !t.checked);
  renderList();
}

const renderList = () => {
  const listRef = document.getElementById('todo-list');
  listRef.innerHTML = '';

  todosState.todos.forEach((todo, index) => {
    listRef.appendChild(createTodoElement(todo, index))
  });
};

const createTodoElement = (todo, key) => {
  const checkboxEl = document.createElement('input');
  checkboxEl.setAttribute('key', key);
  checkboxEl.type = 'checkbox';
  checkboxEl.checked = todo.checked;

  checkboxEl.onchange = _ => {
    todosState.todos[key].checked = !todosState.todos[key].checked;
  };

  const deleteButtonEl = document.createElement('button');
  deleteButtonEl.textContent = 'Delete';
  deleteButtonEl.onclick = _ => {
    //TODO: transform to action dispatch
    todosState.todos.splice(key, 1);
    renderList();
  };

  const editButtonEl = document.createElement('button');
  editButtonEl.textContent = 'Edit';
  editButtonEl.onclick = _ => {
    onEditClick(key);
  }

  const listItemEl = document.createElement('li');
  listItemEl.textContent = todo.name;
  listItemEl.appendChild(checkboxEl);
  listItemEl.appendChild(deleteButtonEl);
  listItemEl.appendChild(editButtonEl);
  return listItemEl;
};

const onEditClick = (key) => {
  let newName = prompt('Enter new name');

  if (newName == null || newName == '') {
    alert("Name cannot be empty");

  } else {
    todosState.todos[key].name = newName;
    renderList();
  }
}

/**
 * Califications grid
 */
import { initCalificationsGrid, onAddCalificationClick, setExamScore, setExamWeight } from './califications.js';

window.onAddCalificationClick = () => { onAddCalificationClick() };
window.setExamScore = setExamScore;
window.setExamWeight = setExamWeight;

const initialize = () => {
  renderList();
  initCalificationsGrid();
}

document.addEventListener('DOMContentLoaded', initialize)