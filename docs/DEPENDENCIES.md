# CivicLoop — Dependencies and Setup Guide

**Status:** Phase 1 Installed Baseline (Active) & Phase 2+ Planned Baseline  
**Applies to:** Frontend and backend contributors  
**Architecture:** React + TypeScript + Vite / Node.js + Fastify / PostgreSQL + Prisma  
**Package manager:** npm only  
**Node.js baseline:** Node.js 26 LTS (Verified on Node.js `v26.13.0`, npm `11.20.0`)  

> **Note on Phase 1 Initialization:** Phase 1 establishes the minimal independent applications for the frontend (`frontend/`) and backend (`backend/`). Dependencies are committed in separate `package.json` and `package-lock.json` manifests. Optional packages (such as Prisma, Argon2, Tailwind CSS, or Vitest) are deferred to their designated roadmap phases to keep the project baseline minimal and clean.

---

## 1. What is a dependency?

A dependency is a package or tool that our application relies on to perform a task. For example:

- React renders the user interface.
- Fastify handles backend HTTP requests.
- Prisma will manage database schema access and migrations (Phase 2).
- Vitest will execute unit and integration tests.

Dependencies are recorded in `package.json`. npm downloads the packages, while `package-lock.json` pins the exact resolved dependency tree so all contributors reproduce identical installations with `npm ci`.

### Dependency categories

| Category | Meaning | Phase 1 Example | Future Phase Example |
|---|---|---|---|
| Runtime dependency | Needed when the application runs | `react`, `fastify` | `@prisma/client`, `argon2` |
| Development dependency | Needed to build, type-check, lint or run dev server | `typescript`, `vite`, `tsx` | `vitest`, `prisma` |
| External service/tool | Installed or run separately from npm | Node.js, npm, Git | PostgreSQL |
| Scaffolding tool | Generates or configures project files | Vite template | shadcn CLI |

---

## 2. Repository package layout

Frontend and backend dependencies are kept completely separate:

```text
CivicLoop/
├── frontend/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── src/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── src/
├── docs/
├── .gitignore
└── README.md
```

- Install frontend packages from `frontend/`.
- Install backend packages from `backend/`.
- Do not install packages at the repository root.
- Do not create a root `package.json` or npm workspace.
- Separate `package-lock.json` files are committed for each application.
- Contributors should use `npm ci` for clean reproducible installs after cloning.

---

## 3. Frontend dependencies

### Installed Phase 1 dependencies

#### Application runtime dependencies
| Package | Manifest Version | Installed Version | Purpose in CivicLoop |
|---|---|---|---|
| `react` | `^19.3.1` | `19.3.1` | Renders user interface components and handles state. |
| `react-dom` | `^19.3.1` | `19.3.1` | Mounts and renders React components into the browser DOM. |

#### Development dependencies
| Package | Manifest Version | Installed Version | Purpose |
|---|---|---|---|
| `vite` | `^8.3.6` | `8.3.8` | Development server with HMR and production bundle builder. |
| `@vitejs/plugin-react` | `^6.1.2` | `6.3.0` | Official React support plugin for Vite. |
| `typescript` | `~7.0.2` | `7.0.2` | Static type checking and TypeScript language support. |
| `@types/react` | `^19.3.0` | `19.3.0` | TypeScript definitions for React. |
| `@types/react-dom` | `^19.3.0` | `19.3.0` | TypeScript definitions for React DOM. |
| `@types/node` | `^26.6.6` | `26.6.6` | Node.js type definitions for Vite configuration. |
| `oxlint` | `^1.90.0` | `1.94.0` | Fast static code analysis / linter. |

### Configured frontend scripts (`frontend/package.json`)
| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Starts local Vite dev server at `http://localhost:5173`. |
| `build` | `tsc -b && vite build` | Typechecks with project references and builds production bundle to `dist/`. |
| `typecheck` | `tsc -b --noEmit` | Static typecheck across all references without generating output files. |
| `preview` | `vite preview` | Previews the production build locally. |
| `lint` | `oxlint` | Runs Oxlint linter across project source. |

### Planned frontend dependencies (Phase 2+)

| Package | Category | Planned Phase | Purpose |
|---|---|---|---|
| `react-router-dom` | Runtime | Phase 2 | Client-side routing between citizen, authority, and admin routes. |
| `tailwindcss` | Build/dev | Styling setup | Utility-first CSS framework. |
| `@tailwindcss/vite` | Build/dev | Styling setup | Tailwind CSS v4 Vite integration. |
| `shadcn/ui` | Scaffolding | UI baseline | Reusable UI component scaffolding (button, dialog, card, etc.). |
| `recharts` | Runtime | Phase 5 | Ward analytics and complaint distribution charts. |
| `lucide-react` | Runtime | Phase 3/4 | Consistent iconography. |
| `vitest` | Development | Testing setup | Unit and component test runner. |
| `jsdom` | Development | Testing setup | DOM emulation environment for tests. |
| `@testing-library/react` | Development | Testing setup | User-centric React component testing. |
| `@testing-library/user-event` | Development | Testing setup | Simulates realistic browser interactions. |
| `@testing-library/jest-dom` | Development | Testing setup | DOM matchers and assertions. |

---

## 4. Backend dependencies

### Installed Phase 1 dependencies

#### Application runtime dependencies
| Package | Manifest Version | Installed Version | Purpose in CivicLoop |
|---|---|---|---|
| `fastify` | `^5.12.8` | `5.12.8` | High-performance HTTP server, route routing, and plugin architecture. |

#### Development dependencies
| Package | Manifest Version | Installed Version | Purpose |
|---|---|---|---|
| `typescript` | `^7.0.2` | `7.0.2` | Static type checking and transpilation to JavaScript. |
| `@types/node` | `^26.6.6` | `26.6.6` | TypeScript type definitions for Node.js runtime APIs. |
| `tsx` | `^4.23.15` | `4.23.15` | Native TypeScript executor and hot-reloading development runner. |

### Configured backend scripts (`backend/package.json`)
| Script | Command | Purpose |
|---|---|---|
| `dev` | `tsx watch src/index.ts` | Runs dev server with live watch/reload on port 3000. |
| `build` | `tsc` | Transpiles TypeScript files from `src/` into `dist/`. |
| `start` | `node dist/index.js` | Runs compiled server entry point in production mode. |
| `typecheck` | `tsc --noEmit` | Static type checking without emitting files. |

### Planned backend dependencies (Phase 2+)

| Package | Category | Planned Phase | Purpose |
|---|---|---|---|
| `@prisma/client` | Runtime | Phase 2 | Type-safe database queries for PostgreSQL. |
| `prisma` | Development | Phase 2 | Schema migration and Prisma client generation CLI. |
| `argon2` | Runtime | Phase 2 | Secure Argon2id password hashing. |
| `@fastify/cookie` | Runtime | Phase 2 | HTTP cookie parsing and signing. |
| `@fastify/session` | Runtime | Phase 2 | Server-managed session management. |
| *Session Store Adapter* | Runtime | Phase 2 | PostgreSQL-backed persistent session store. |
| `@fastify/cors` | Runtime | Phase 2/3 | Restricted CORS configuration for local frontend communication. |
| `@fastify/helmet` | Runtime | Phase 2/3 | Security response headers. |
| `@fastify/rate-limit` | Runtime | Phase 2 | Rate limiting on auth and sensitive routes. |
| `@fastify/multipart` | Runtime | Phase 3/5 | Validated file uploads for complaint & resolution evidence. |
| `zod` | Runtime | Phase 2 | Schema and payload runtime validation. |
| `vitest` | Development | Testing setup | Unit and integration test runner. |
| `supertest` | Development | Testing setup | HTTP assertion library for route testing. |
| `@types/supertest` | Development | Testing setup | TypeScript definitions for Supertest. |

---

## 5. Database and external tools

| Tool | Purpose | Where it runs | Status |
|---|---|---|---|
| **Node.js** | JavaScript/TypeScript server and tooling runtime. | Developer machine and server runtime. | Installed (baseline Node 26, tested on v26.13.0). |
| **npm** | Package management and lifecycle scripts. | Developer machine and CI. | Installed (v11.20.0). |
| **Git** | Distributed version control. | Developer machine and GitHub. | Active repository. |
| **PostgreSQL** | Relational database for complaints, users, groups, and audit trails. | Local service or container. | Required in Phase 2. |

---

## 6. Environment variables

### Frontend (`frontend/.env.example`)
```env
# API Base URL for backend communication
VITE_API_BASE_URL=http://127.0.0.1:3000/api/v1
```

### Backend (`backend/.env.example`)
```env
# Server Configuration
PORT=3000
HOST=127.0.0.1
NODE_ENV=development
```

Real `.env` files are ignored by Git. Never commit real secrets or database credentials.

---

## 7. Version and lockfile policy

1. **Team baseline:** Node.js 26 LTS. Tested and verified on Node.js `v26.13.0` and npm `11.20.0`.
2. **Package manager:** npm exclusively. Never commit `yarn.lock` or `pnpm-lock.yaml`.
3. **Lockfile discipline:** Separate `package-lock.json` files are committed in `frontend/` and `backend/`.
4. **Reproducible installs:** Use `npm ci` when installing from a fresh clone.
5. **No root workspaces:** For the MVP, `frontend/` and `backend/` are strictly independent.
6. **Security & Audit:** Review `npm audit` findings carefully. Do not apply breaking `--force` updates without team review.
   - *Advisory note:* `npm audit` in `frontend` reports a known ReDoS advisory in `picomatch` (via `tinyglobby` / `vite`). Resolving via `npm audit fix --force` would downgrade to `vite@6.2.7` breaking compatibility with the active Vite 8 template. Per repository policy, breaking downgrades are avoided.

---

## 8. Verified verification commands

These commands have been executed and verified in this environment:

### Frontend (`cd frontend`)
- `npm install`: Clean installation succeeded (lockfile generated).
- `npm run typecheck`: Passed with 0 errors (`tsc -b --noEmit`).
- `npm run build`: Production build succeeded (`dist/` generated with 17 modules transformed, ~221 kB JS).

### Backend (`cd backend`)
- `npm install`: Clean installation succeeded (0 vulnerabilities, lockfile generated).
- `npm run typecheck`: Passed with 0 errors (`tsc --noEmit`).
- `npm run build`: Production compilation succeeded (`dist/` generated with `index.js`, `app.js`, and `routes/health.js`).
- `npm run start` / `npm run dev`: Successfully listened on `http://127.0.0.1:3000`.
- Health check verification: `GET http://127.0.0.1:3000/health` returned HTTP 200 with JSON:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-11-18T08:36:25.009Z",
    "uptime": 1.957
  }
  ```
