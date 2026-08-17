const express = require('express');
const db = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// All task routes require authentication
router.use(requireAuth);

// GET /api/tasks?filter=all|pending|completed
router.get('/', (req, res) => {
  const { filter } = req.query;
  let query = 'SELECT * FROM tasks WHERE user_id = ?';
  const params = [req.userId];

  if (filter === 'pending') {
    query += ' AND completed = 0';
  } else if (filter === 'completed') {
    query += ' AND completed = 1';
  }

  query += ' ORDER BY created_at DESC';

  const tasks = db.prepare(query).all(...params);
  res.json(tasks);
});

// POST /api/tasks - create a task
router.post('/', (req, res) => {
  const { title, description } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const result = db
    .prepare('INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)')
    .run(req.userId, title.trim(), description || '');

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(task);
});

// PUT /api/tasks/:id - update a task (title/description)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(id, req.userId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  db.prepare(
    'UPDATE tasks SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(title ?? task.title, description ?? task.description, id);

  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json(updated);
});

// PATCH /api/tasks/:id/complete - toggle/mark completed status
router.patch('/:id/complete', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body; // expects boolean

  const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(id, req.userId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const newStatus = completed !== undefined ? (completed ? 1 : 0) : task.completed ? 0 : 1;

  db.prepare(
    'UPDATE tasks SET completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(newStatus, id);

  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json(updated);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(id, req.userId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  res.json({ message: 'Task deleted successfully' });
});

module.exports = router;
