const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const filterBtns = document.querySelectorAll('.filter-btn');
const logoutBtn = document.getElementById('logout-btn');

const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const cancelEditBtn = document.getElementById('cancel-edit');

let currentFilter = 'all';

// Redirect to login if not authenticated
async function checkAuth() {
  const res = await fetch('/api/me');
  if (!res.ok) {
    window.location.href = '/index.html';
  }
}

async function loadTasks() {
  const res = await fetch(`/api/tasks?filter=${currentFilter}`);
  if (!res.ok) {
    if (res.status === 401) window.location.href = '/index.html';
    return;
  }
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyMessage.classList.remove('hidden');
    return;
  }
  emptyMessage.classList.add('hidden');

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <div class="task-info">
        <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''} />
        <div class="task-text">
          <span class="task-title">${escapeHtml(task.title)}</span>
          ${task.description ? `<span class="task-description">${escapeHtml(task.description)}</span>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
      </div>
    `;

    li.querySelector('.complete-checkbox').addEventListener('change', (e) =>
      toggleComplete(task.id, e.target.checked)
    );
    li.querySelector('.btn-edit').addEventListener('click', () => openEditModal(task));
    li.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));

    taskList.appendChild(li);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;

  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  if (res.ok) {
    taskForm.reset();
    loadTasks();
  }
});

async function toggleComplete(id, completed) {
  await fetch(`/api/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  loadTasks();
}

async function deleteTask(id) {
  if (!confirm('Delete this task?')) return;
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

function openEditModal(task) {
  document.getElementById('edit-task-id').value = task.id;
  document.getElementById('edit-title').value = task.title;
  document.getElementById('edit-description').value = task.description || '';
  editModal.classList.remove('hidden');
}

cancelEditBtn.addEventListener('click', () => editModal.classList.add('hidden'));

editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('edit-task-id').value;
  const title = document.getElementById('edit-title').value;
  const description = document.getElementById('edit-description').value;

  await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  editModal.classList.add('hidden');
  loadTasks();
});

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    loadTasks();
  });
});

logoutBtn.addEventListener('click', async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/index.html';
});

checkAuth();
loadTasks();

