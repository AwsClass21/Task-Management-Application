const express = require('express');
const router = express.Router();

// You must change '../database.js' to match the exact name and location 
// of the file containing your team's database code.
const db = require('./db/database.js'); 

router.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    try {
        // better-sqlite3 uses prepare() and run() synchronously
        const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
        const info = stmt.run(taskId);

        // info.changes returns the number of rows deleted
        if (info.changes === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during deletion' });
    }
});

module.exports = router;








