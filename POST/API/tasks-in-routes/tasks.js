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

