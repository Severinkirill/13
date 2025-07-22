const form = document.querySelector('.js--form');
const input = document.querySelector('.js--form__input');
const todosWrapper = document.querySelector('.js--todos-wrapper');

let todos = [];


function loadTodos() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todosWrapper.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.checked ? ' todo-item--checked' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.checked;
    checkbox.addEventListener('change', () => {
      todos[idx].checked = !todos[idx].checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement('span');
    span.className = 'todo-item__description';
    span.textContent = todo.text;

    const delBtn = document.createElement('button');
    delBtn.className = 'todo-item__delete';
    delBtn.textContent = 'Видалити';
    delBtn.addEventListener('click', () => {
      todos.splice(idx, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    todosWrapper.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (value) {
    todos.push({ text: value, checked: false });
    saveTodos();
    renderTodos();
    input.value = '';
  }
});


loadTodos();
renderTodos();
