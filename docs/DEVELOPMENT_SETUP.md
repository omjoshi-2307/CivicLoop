# CivicLoop — Development Setup

Status: setup plan; verify actual versions and scripts when application scaffolding is created.

## 1. Prerequisites
- Git
- Node.js version compatible with the selected Vite, Fastify and Prisma releases; use one agreed major version across the team.
- npm
- PostgreSQL local service or container
- VS Code or another editor
- GitHub access to the repository

Do not assume dependencies are installed. At the time of this document, frontend/ and backend/ contain placeholders rather than application manifests.

## 2. Clone the repository
Run from a terminal:

git clone https://github.com/omjoshi-2307/CivicLoop.git
cd CivicLoop
git status

Create a feature branch before making changes:

git switch -c docs/your-task-name

## 3. Planned application layout
frontend/ will contain the React + TypeScript + Vite client.
backend/ will contain the Node.js + Fastify + TypeScript API.
PostgreSQL will store relational application records. Prisma will manage schema access and migrations.

Exact package scripts, ports, environment variable names and local database commands must be added when scaffolding is implemented. Do not invent them in client code.

## 4. Environment configuration
- Keep local environment files untracked.
- Provide .env.example files containing placeholders only when the relevant application is initialized.
- Never commit database passwords, session secrets, API keys or personal information.
- Use a distinct development database; never test against production data.

## 5. Database setup
Install or run a PostgreSQL version supported by the selected Prisma release. Create a dedicated local development database and a least-privilege application user. Store the connection string in the backend's local environment file.

Prisma schema and migration commands must be documented alongside the first committed backend manifest. Do not run destructive database resets against shared or production data.

## 6. Install dependencies
Use the commands in docs/DEPENDENCIES.md from the correct application directory after package.json and package-lock.json are committed.
Use npm ci for a clean reproducible install when a lockfile exists. Do not run npm install in an empty placeholder directory or create manifests independently of the agreed setup task.

## 7. Verify setup
Once scripts exist, the setup task must verify:
- Frontend starts locally.
- Backend starts locally.
- Backend can connect to the development PostgreSQL database.
- Prisma schema validates and client generation succeeds.
- Type checks and configured tests pass.
- Frontend can call the local API using the agreed origin configuration.

Record exact tested commands, tool versions and ports in this document after they are verified.