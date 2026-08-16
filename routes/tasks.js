router.get('/', authenticateToken, async (req, res) => {
    const { filter } = req.query;

    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [req.user.id];

    if (filter === 'active') {
        query += ' AND completed = 0';
    } else if (filter === 'completed') {
        query += ' AND completed = 1';
    }

    query += ' ORDER BY created_at DESC';

    try {
        const tasks = await db.all(query, params);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});