# Task-Management-Application
A simple full-stack Task Management Application built with **Node.js, Express, and SQLite**.

## Features

- Login / Register (JWT auth stored in an httpOnly cookie)
- Dashboard showing all tasks
- Create, Update, Delete tasks
- Mark tasks as Completed
- Filter tasks: All / Pending / Completed
- Persistent storage via SQLite (`better-sqlite3`)

## Project Structure

```
task-app/
├── db/
│   └── database.js       # SQLite connection + schema
├── middleware/
│   └── auth.js            # JWT auth middleware
├── routes/
│   ├── auth.js             # Register / Login / Logout
│   └── tasks.js            # Task CRUD, complete, filter
├── public/
│   ├── index.html           # Login/Register page
│   ├── dashboard.html       # Dashboard page
│   ├── style.css
│   ├── auth.js               # Frontend logic for login/register
│   └── app.js                 # Frontend logic for dashboard
├── server.js
├── package.json
├── .env.example
└── .gitignore
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set a real `JWT_SECRET`:
   ```bash
   cp .env.example .env
   ```

3. Run the app:
   ```bash
   npm start
   ```
   Or with auto-reload during development:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

The SQLite database file (`db/tasks.sqlite`) is created automatically on first run.

## API Overview

| Method | Endpoint                  | Description                  |
|--------|----------------------------|-------------------------------|
| POST   | `/api/auth/register`       | Register a new user           |
| POST   | `/api/auth/login`          | Log in                        |
| POST   | `/api/auth/logout`         | Log out                       |
| GET    | `/api/tasks?filter=`       | Get tasks (all/pending/completed) |
| POST   | `/api/tasks`                | Create a task                 |
| PUT    | `/api/tasks/:id`            | Update a task                 |
| PATCH  | `/api/tasks/:id/complete`   | Mark task complete/incomplete |
| DELETE | `/api/tasks/:id`            | Delete a task                 |

## Feature Branches

This codebase maps to the following feature branches:

- `feature/login-register` → `routes/auth.js`, `public/index.html`, `public/auth.js`
- `feature/dashboard` → `public/dashboard.html`, `server.js` (static serving)
- `feature/create-task` → `POST /api/tasks` in `routes/tasks.js`
- `feature/update-task` → `PUT /api/tasks/:id` in `routes/tasks.js`
- `feature/delete-task` → `DELETE /api/tasks/:id` in `routes/tasks.js`
- `feature/mark-completed` → `PATCH /api/tasks/:id/complete` in `routes/tasks.js`
- `feature/filter-tasks` → `GET /api/tasks?filter=` in `routes/tasks.js`, filter buttons in `public/app.js`
- `feature/data-storage` → `db/database.js`
