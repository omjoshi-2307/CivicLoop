# CivicLoop — Dependencies and Setup Guide

**Status:** Planned dependency baseline — not an installation record  
**Applies to:** Frontend and backend contributors  
**Architecture:** React + TypeScript + Vite / Node.js + Fastify / PostgreSQL + Prisma  
**Package manager:** npm  
**Hosting:** Undecided; local development first

> Important: This document defines the packages we expect to use and explains their purpose. It does **not** mean these packages are already installed. There are currently no frontend or backend `package.json` manifests in the repository. Install dependencies only during the approved project setup stage, then commit the generated manifests and lockfiles.

---

## 1. What is a dependency?

A dependency is a package or tool that our application relies on to perform a task. For example:

- React helps build the user interface.
- Fastify handles backend HTTP requests.
- Prisma helps backend code communicate with PostgreSQL.
- Vitest runs automated tests.

Dependencies are recorded in a `package.json` file. npm downloads the packages, while `package-lock.json` records the resolved dependency tree so contributors can reproduce an installation with `npm ci`.

### Dependency categories

| Category | Meaning | Example |
|---|---|---|
| Runtime dependency | Needed when the application runs | React, Fastify |
| Development dependency | Needed to build, type-check, lint or test | TypeScript, Vite, Vitest |
| External service/tool | Installed or run separately from npm | PostgreSQL |
| CLI/scaffolding tool | Used to generate or configure project files | shadcn CLI |

Do not add a package just because it is popular. Each dependency should have a clear responsibility.

---

## 2. Repository package layout

We will keep frontend and backend dependencies separate:

```text
CivicLoop/
├── frontend/
│   ├── package.json
│   └── package-lock.json
├── backend/
│   ├── package.json
│   └── package-lock.json
├── docs/
└── README.md
```

- Install frontend packages from `frontend/`.
- Install backend packages from `backend/`.
- Do not install every package at the repository root.
- Commit both `package.json` and `package-lock.json` for each application.
- Contributors should use `npm ci` after cloning, not independently regenerate lockfiles.

We are not introducing a monorepo workspace tool for the MVP.

---

## 3. Frontend dependencies

### Application dependencies

| Package | Category | Purpose in CivicLoop |
|---|---|---|
| `react` | Runtime | Builds reusable UI components and interactive screens. |
| `react-dom` | Runtime | Renders React into the browser DOM. |
| `react-router-dom` | Runtime | Handles navigation between citizen, authority and admin pages. |
| `recharts` | Runtime, when analytics UI begins | Displays ward and complaint statistics as charts. |
| `lucide-react` | Runtime, if adopted by the UI design | Provides consistent interface icons. |

### Development dependencies

| Package | Category | Purpose |
|---|---|---|
| `vite` | Development | Frontend dev server and production build tool. |
| `@vitejs/plugin-react` | Development | React support in Vite. |
| `typescript` | Development | Static type checking and TypeScript compilation support. |
| `@types/react` | Development | React type definitions. |
| `@types/react-dom` | Development | React DOM type definitions. |
| `tailwindcss` | Build/development | Utility-first CSS framework. |
| `@tailwindcss/vite` | Build/development | Integrates Tailwind CSS v4 with Vite, if Tailwind v4 is selected during setup. |
| `vitest` | Development | Frontend and shared utility tests. |
| `@testing-library/react` | Development | Tests React components through user-facing behaviour. |
| `@testing-library/user-event` | Development | Simulates realistic user interactions in component tests. |
| `@testing-library/jest-dom` | Development | Adds useful DOM assertions. |
| `jsdom` | Development | Browser-like DOM environment for component tests. |

### shadcn/ui

shadcn/ui is not installed as one conventional runtime component-library dependency. Its CLI adds selected component source files and supporting configuration to our project.

We will initialize it only after the frontend framework and styling setup are working. Contributors should use the existing project components instead of independently initializing a second shadcn configuration.

Official guide: https://ui.shadcn.com/docs/installation/vite

### Frontend installation plan

Run these commands from the repository root after the frontend setup task is approved:

```bash
cd frontend
npm install react react-dom react-router-dom
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
```

Add styling and testing packages in the dedicated setup step. For Tailwind v4 with its Vite plugin:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Add charts when the analytics interface is implemented:

```bash
npm install recharts
```

Add component testing packages when test configuration is created:

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

Optional icon package, only if the agreed design uses it:

```bash
npm install lucide-react
```

---

## 4. Backend dependencies

### Application dependencies

| Package | Category | Purpose in CivicLoop |
|---|---|---|
| `fastify` | Runtime | Creates the HTTP API server and handles routes and requests. |
| `@fastify/cookie` | Runtime | Parses and manages browser cookies. |
| `@fastify/session` | Runtime | Provides server-managed session handling; requires a compatible persistent session-store adapter. |
| `@fastify/cors` | Runtime, if frontend/backend use separate origins | Controls which browser origins may call the API. Configure explicit allowed origins; do not use unrestricted production CORS. |
| `@fastify/helmet` | Runtime | Adds security-related HTTP response headers. |
| `@fastify/multipart` | Runtime | Handles complaint and resolution evidence uploads with explicit limits. |
| `@fastify/rate-limit` | Runtime | Limits repeated requests, especially authentication attempts and other abuse-prone routes. |
| `zod` | Runtime | Validates request data and other untrusted input where selected. |
| `argon2` | Runtime | Hashes and verifies user passwords using Argon2id. |
| `@prisma/client` | Runtime | Provides typed database access from backend code. |
| `dotenv` | Runtime/development configuration | Loads local environment variables where the chosen Node configuration requires it. |

**Session-store decision:** The session cookie and session-management plugin are not the database store by themselves. Before implementation, we must select and test a maintained PostgreSQL-compatible store adapter for the chosen Fastify session plugin. Do not silently substitute an in-memory store: sessions must survive server restarts and work across backend instances if deployment later requires it.

**CORS note:** If the frontend and backend are served from the same origin, CORS may not be needed in production. Local development often uses separate ports, so a narrowly configured development origin may be useful.

### Development dependencies

| Package | Category | Purpose |
|---|---|---|
| `typescript` | Development | Type checking and compilation support. |
| `tsx` | Development | Runs TypeScript files during local development. |
| `prisma` | Development | Prisma CLI for schema validation, client generation and migrations. |
| `vitest` | Development | Tests backend services and utility logic. |
| `supertest` | Development | Tests HTTP API behaviour. |
| `@types/supertest` | Development | Type definitions for Supertest. |
| `@types/node` | Development | Node.js type definitions. |

### Backend installation plan

Run these commands from the repository root after the backend setup task is approved:

```bash
cd backend
npm install fastify @fastify/cookie @fastify/session @fastify/helmet @fastify/multipart @fastify/rate-limit zod argon2 @prisma/client
npm install -D typescript tsx prisma @types/node vitest supertest @types/supertest
```

Install `@fastify/cors` only if the chosen local or production origin arrangement requires it:

```bash
npm install @fastify/cors
```

The PostgreSQL session-store adapter is intentionally not listed as a final package yet. Confirm compatibility with the selected session plugin and test persistence before adding it.

---

## 5. Database and external tools

These are not ordinary frontend/backend application dependencies.

| Tool | Purpose | Where it runs |
|---|---|---|
| PostgreSQL | Stores users, complaints, status history, groups, evidence metadata, notifications and other relational records. | Local service/container during development; hosted database may be selected later. |
| Node.js | JavaScript runtime for Vite tooling and the Fastify server. | Developer machine and deployment runtime. |
| npm | Installs packages and runs project scripts. | Developer machine and CI. |
| Git | Tracks source changes and collaboration. | Developer machine and GitHub. |

Use a PostgreSQL version supported by the selected Prisma release. Record the actual local database version in the setup notes when the development environment is created.

---

## 6. Environment variables and secrets

Configuration belongs in environment variables, not hard-coded source files.

The backend will eventually need values such as:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string. |
| `SESSION_SECRET` | Secret used by the session implementation. |
| `PORT` | Backend listening port. |
| `HOST` | Backend bind address. |
| `NODE_ENV` | Runtime environment. |
| `FRONTEND_ORIGIN` | Allowed frontend origin when CORS is enabled. |
| `UPLOAD_DIR` | Local evidence storage directory during development. |

The exact variables depend on the final implementation. Keep a safe `.env.example` containing placeholders only. Keep real `.env` files out of Git. Never paste credentials into issues, commits, screenshots or public chat.

---

## 7. Version and lockfile policy

1. Use a supported Node.js LTS release compatible with all selected packages. The team should use the same major Node.js version.
2. Use npm consistently; do not mix npm, pnpm and Yarn lockfiles.
3. Use compatible stable package releases at setup time. Do not copy old version numbers from tutorials without checking compatibility.
4. Commit `package.json` and `package-lock.json` together.
5. Use `npm ci` for repeatable installs after cloning or in CI.
6. Do not manually edit lockfiles.
7. Review new dependencies before adding them: purpose, maintenance, license, compatibility and security.
8. Avoid installing duplicate libraries that solve the same problem.
9. Update dependencies deliberately, then run tests and type checks.
10. Do not commit `node_modules/`, build output, secrets or local database files.

---

## 8. Common commands

Run commands from the correct application directory.

| Command | Purpose |
|---|---|
| `npm install` | Installs dependencies and may update the lockfile. Use during initial setup or when dependencies change. |
| `npm ci` | Installs exactly from the committed lockfile; preferred for clean setup and CI. |
| `npm run dev` | Starts the development script defined by that application's package.json. |
| `npm run build` | Runs the production build script, once configured. |
| `npm run typecheck` | Runs TypeScript checks, once configured. |
| `npm test` | Runs the configured test suite. |
| `npm audit` | Reports known dependency vulnerabilities; review findings rather than blindly applying breaking fixes. |

The scripts above must be added to each `package.json` as part of setup. Do not assume a script exists before checking the manifest.

---

## 9. Contributor rules

### For Swapnil (frontend)

- Work inside `frontend/` unless a shared API contract change has been agreed.
- Focus first on React, TypeScript, Vite, Tailwind and the existing shadcn components.
- Use the agreed API contract; do not invent backend routes or response fields.
- Use clearly labelled mock data only until the backend integration is ready.
- Do not add authentication or authorization logic that is treated as a security boundary in the browser.
- Tell the project lead before adding a new dependency.

### For the backend track

- Work inside `backend/` and the agreed shared documentation.
- Keep route handlers thin and business logic in modules/services.
- Enforce session, role, ownership and public/private data rules on the server.
- Validate untrusted inputs and uploaded files.
- Do not expose database records directly as public API responses.
- Tell the project lead before adding a new dependency or changing an API contract.

### For everyone

- Do not edit the same files concurrently.
- Use feature branches and meaningful commits.
- Open a pull request for review before merging into `main`.
- Include setup/test evidence in the pull request.
- Never commit secrets or real citizen personal information.
- Do not claim a dependency is installed until it appears in the correct manifest and a clean install succeeds.

---

## 10. Official package references

- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Vite: https://vite.dev/
- Tailwind CSS: https://tailwindcss.com/
- shadcn/ui: https://ui.shadcn.com/
- Fastify: https://fastify.dev/
- Fastify plugins: https://fastify.dev/ecosystem/
- Zod: https://zod.dev/
- PostgreSQL: https://www.postgresql.org/
- Prisma: https://www.prisma.io/docs
- Argon2: https://github.com/P-H-C/phc-winner-argon2
- Vitest: https://vitest.dev/
- Supertest: https://github.com/ladjs/supertest
- Recharts: https://recharts.org/

**This is the planned dependency baseline, not proof of implementation.** Update this document when actual package manifests are created, and keep it aligned with the dependencies and versions committed in the repository.
