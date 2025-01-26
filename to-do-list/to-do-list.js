const todoForm = document.getElementById('todoForm');
const todoList = document.getElementById('todoList');
let todos = [];
 
 
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = document.getElementById('taskName').value.trim();
  const taskPriority = document.getElementById('taskPriority').value;
  const newTask = {
    id: Date.now(), name: taskName, priority: parseInt(taskPriority),
  };
 
  todos.push(newTask);
  todos.sort((a, b) => a.priority - b.priority);
  renderTodos();
  todoForm.reset();
});
 
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>
        <strong>${task.name}</strong>
        <span class="badge bg-${getPriorityColor(task.priority)} 
        ms-2">${getPriorityLabel(task.priority)}</span>
      </span>
      <div>
        <button class="btn btn-warning btn-sm me-2" 
        onclick="editTask(${task.id})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick=
        "deleteTask(${task.id})">Eliminar</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}
 
function getPriorityLabel(priority) {
  switch (priority) {
    case 1:
      return 'Prioridad Alta';
    case 2:
      return 'Prioridad Media';
    case 3:
      return 'Prioridad Baja';
    default:
      return '';
  }
}
 
function getPriorityColor(priority) {
  switch (priority) {
    case 1:
      return 'danger';
    case 2:
      return 'warning';
    case 3:
      return 'success';
    default:
      return '';
  }
}
  
function editTask(id) {
  const task = todos.find((t) => t.id === id);
  if (task) {
    const newName = prompt('Escriba lo que desea que cambien', task.name);
    const newPriority = prompt(
      'Edita la prioridad (1 = Alta, 2 = Media, 3 = Baja):',
      task.priority
    );
 
    if (newName !== null && newPriority !== null) {
      task.name = newName.trim() || task.name;
      task.priority = parseInt(newPriority) || task.priority;
      todos.sort((a, b) => a.priority - b.priority);
      renderTodos();
    }
  }
}
 
function deleteTask(id) {
  todos = todos.filter((task) => task.id !== id);
  renderTodos();
}