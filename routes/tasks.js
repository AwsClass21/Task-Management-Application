const express = require('express');
const router = express.Router();

const db = require('./db/database.js');

router.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    try {
        const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
        const info = stmt.run(taskId);

        if (info.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during deletion' });
    }
});


router.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    try {
        const stmt = db.prepare(`
            UPDATE tasks
            SET title = ?, description = ?, completed = ?
            WHERE id = ?
        `);

        const info = stmt.run(title, description, completed ? 1 : 0, taskId);

        if (info.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({
            message: 'Task updated successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during update' });
    }
});


module.exports = router;








