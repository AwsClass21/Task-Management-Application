require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { requireAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Simple endpoint to check current logged-in user (used by frontend)
app.get('/api/me', requireAuth, (req, res) => {
  res.json({ userId: req.userId });
});

app.listen(PORT, () => {
  console.log(`Task Management App running at http://localhost:${PORT}`);
});

