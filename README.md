# Todo Test Task

A full-stack task management application built with NestJS (backend) and Next.js (frontend).

## Features

- User registration and authentication (JWT, cookies)
- Task creation, editing, assignment
- Protected routes (frontend and backend)
- PostgreSQL database with TypeORM
- Modern UI with Material-UI (MUI) and custom dark theme

## Tech Stack

- **Backend:** NestJS, TypeORM, PostgreSQL, JWT
- **Frontend:** Next.js (App Router), React, MUI, Axios
- **Monorepo:** Managed with npm workspaces

## Project Structure

```
todo-test-task/
├── apps/
│   ├── api/      # NestJS backend
│   └── web/      # Next.js frontend
├── package.json  # Monorepo root
└── README.md
```

### Backend Structure (`apps/api`)
- `src/auth/` — Auth module (domain, application, infrastructure, interfaces)
- `src/task/` — Task module (domain, application, infrastructure, interfaces)
- `src/shared/` — Shared config and database modules

### Frontend Structure (`apps/web`)
- `app/` — Next.js app router pages
- `features/` — Feature-based React components
- `shared/` — Hooks, services, types, and UI utilities
- `entities/` — Domain entity UI components
- `widgets/` — Reusable UI widgets

## API Endpoints

| Method | Endpoint         | Description                | Auth Required |
|--------|------------------|----------------------------|--------------|
| POST   | /auth/register   | Register new user          | No           |
| POST   | /auth/login      | Login                      | No           |
| GET    | /auth/logout     | Logout                     | Yes          |
| GET    | /users           | Get all users              | Yes          |
| POST   | /task            | Create task                | Yes          |
| GET    | /task            | Get all tasks              | Yes          |
| POST   | /task/edit       | Edit task                  | Yes          |
| POST   | /task/assign     | Assign task to user        | Yes          |

## Frontend Routes

| Path            | Description         | Protected |
|-----------------|--------------------|-----------|
| /               | Login/Register     | No        |
| /tasks          | Task list          | Yes       |
| /tasks/create   | Create task        | Yes       |
| /tasks/edit     | Edit task          | Yes       |

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL

### Setup

1. **Clone the repo**
2. **Create a PostgreSQL database locally**
   - Make sure PostgreSQL is running on your machine.
   - Create a new database (e.g., `todo_db`).
   - Note your database name, user, and password for environment variables.
3. **Install dependencies**
   ```sh
   npm install
   cd apps/api && npm install
   cd ../web && npm install
   cd ../..
   ```
4. **Configure environment variables**
   - Copy `.env.example` to `.env` in both `apps/api` and `apps/web`, and fill in your values (including your local PostgreSQL database credentials).

### Database

- Run migrations:
  ```sh
  cd apps/api
  npm run migration:run
  cd ../..
  ```

### Running the Apps

- **Backend:**  
  ```sh
  cd apps/api
  npm run start:dev
  ```
- **Frontend:**  
  ```sh
  cd apps/web
  npm run dev
  ```

### Environment Variables

- **Backend:**  
  - `PORT`, `FRONTEND_URL`, `DB_TYPE`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`
- **Frontend:**  
  - `NEXT_PUBLIC_API_URL` (e.g., `http://localhost:3001`)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.