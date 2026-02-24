import { createTask, addTask, toggleTask, removeTask, getStats } from './tasks.js';

let tasks = [];

// ---- Elementos del DOM ----
const form      = document.getElementById('task-form');
const input     = document.getElementById('task-input');
const listEl    = document.getElementById('task-list');
const emptyMsg  = document.getElementById('empty-msg');
const totalEl   = document.getElementById('total-count');
const doneEl    = document.getElementById('done-count');
const pendingEl = document.getElementById('pending-count');

// ---- Renderizado ----
function render() {
  // Estadísticas
  const stats = getStats(tasks);
  totalEl.textContent    = `Total: ${stats.total}`;
  doneEl.textContent     = `Completadas: ${stats.done}`;
  pendingEl.textContent  = `Pendientes: ${stats.pending}`;

  // Mensaje vacío
  emptyMsg.classList.toggle('hidden', tasks.length > 0);

  // Lista
  listEl.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item${task.done ? ' done' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <button class="task-check" aria-label="Completar tarea">${task.done ? '✓' : ''}</button>
      <span class="task-text">${escapeHtml(task.text)}</span>
      <button class="task-delete" aria-label="Eliminar tarea">✕</button>
    `;

    listEl.appendChild(li);
  });
}

// ---- Eventos ----
form.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const task = createTask(input.value);
    tasks = addTask(tasks, task);
    input.value = '';
    render();
  } catch {
    input.focus();
  }
});

listEl.addEventListener('click', (e) => {
  const li = e.target.closest('.task-item');
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.closest('.task-check')) {
    tasks = toggleTask(tasks, id);
    render();
  }

  if (e.target.closest('.task-delete')) {
    tasks = removeTask(tasks, id);
    render();
  }
});

// ---- Utilidades ----
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ---- Inicio ----
render();
