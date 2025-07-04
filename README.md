# Todo Test Task

A full-stack task management application with NestJS backend and Next.js frontend.

## Project Structure
todo-test-task/
├── apps/
│ ├── api/ # NestJS backend
│ │ ├── src/
│ │ │ ├── modules/ # Feature modules
│ │ │ ├── shared/ # Shared utilities and configs
│ │ │ └── main.ts # Application entry point
│ │ └── ... # NestJS config files
│ │
│ └── web/ # Next.js frontend
│ ├── app/ # App router
│ ├── features/ # Feature components
│ ├── shared/ # Shared components and hooks
│ └── ... # Next.js config files
│
├── .gitignore
├── package.json # Root package.json
└── README.md


## Prerequisites

- Node.js v18+
- PostgreSQL (for backend)
- npm or yarn

## Installation
npm install
cd apps/api && npm install
cd ../web && npm install
cd ../..

## Configuration
You might copy dotenv variables from .env.example on the frontend and on the backend

## Backend
Run database migrations:
cd apps/api
npm run migration:run
cd ../..

## Frontend (Web)
NEXT_PUBLIC_API_URL=http://localhost:3001