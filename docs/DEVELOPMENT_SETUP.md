# CivicLoop — Development Setup

**Status:** Phase 1 Application Initialization Complete (Frontend & Backend Scaffolding Established)  
**Applies to:** Frontend and backend contributors  
**Baseline Node.js:** Node.js 26 LTS (Verified on Node.js `v26.13.0`, npm `11.20.0`)  

---

## 1. Prerequisites
- **Git**
- **Node.js**: Node.js 26 LTS baseline (tested and verified with Node.js `v26.13.0`).
- **npm**: npm `11.20.0` (use npm exclusively; do not mix package managers).
- **PostgreSQL**: Required starting from Phase 2 (local service or container).
- **Editor**: VS Code or preferred editor with TypeScript support.

---

## 2. Clone and Branch
Clone the repository and switch to your feature branch:

```bash
git clone https://github.com/omjoshi-2307/CivicLoop.git
cd CivicLoop
git checkout feat/phase-1-app-initialization
```

---

## 3. Application Layout & Ports

The repository contains two independent TypeScript applications without root-level workspaces:

```text
CivicLoop/
├── frontend/               # React 19 + TypeScript + Vite client (Port 5173)
│   ├── src/
│   │   ├── App.tsx         # CivicLoop entry screen
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/                # Node.js + Fastify 5 + TypeScript server (Port 3000)
│   ├── src/
│   │   ├── routes/
│   │   │   └── health.ts   # GET /health endpoint
│   │   ├── app.ts          # Fastify app factory
│   │   └── index.ts        # Server entry point & graceful shutdown
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── docs/                   # Project documentation
└── .gitignore
```

### Local Network Ports and Endpoints
| Application | Default Port | Host | Key Endpoints |
|---|---|---|---|
| **Frontend** | `5173` | `localhost` | `http://localhost:5173/` |
| **Backend** | `3000` | `127.0.0.1` / `0.0.0.0` | `GET http://127.0.0.1:3000/health` |

---

## 4. Environment Configuration

Both applications support environment variables through untracked `.env` files. Safe template files are provided:

- `frontend/.env.example`
  ```env
  VITE_API_BASE_URL=http://127.0.0.1:3000/api/v1
  ```
- `backend/.env.example`
  ```env
  PORT=3000
  HOST=127.0.0.1
  NODE_ENV=development
  ```

Copy the template to create local configuration if custom values are needed:
```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

*Note: Real `.env` files are ignored by Git. Never commit secrets, credentials, or personal information.*

---

## 5. Frontend Setup & Verification

Navigate to `frontend/`:

```bash
cd frontend
```

### Scripts Available
| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `vite` | Starts local development server at `http://localhost:5173`. |
| `npm run build` | `tsc -b && vite build` | Compiles TypeScript and builds optimized bundle to `dist/`. |
| `npm run typecheck` | `tsc -b --noEmit` | Performs static type check without emitting files. |
| `npm run preview` | `vite preview` | Previews production build locally. |
| `npm run lint` | `oxlint` | Runs fast code quality linter. |

### Verified Commands
```bash
# 1. Clean installation
npm install

# 2. Static type checking
npm run typecheck

# 3. Production build
npm run build
```

---

## 6. Backend Setup & Verification

Navigate to `backend/`:

```bash
cd backend
```

### Scripts Available
| Script | Command | Purpose |
|---|---|---|
| `npm run dev` | `tsx watch src/index.ts` | Starts development server with hot reloading on port 3000. |
| `npm run build` | `tsc` | Compiles TypeScript code to `dist/`. |
| `npm run start` | `node dist/index.js` | Runs compiled production server from `dist/`. |
| `npm run typecheck` | `tsc --noEmit` | Performs static type check without emitting files. |

### Verified Commands
```bash
# 1. Clean installation
npm install

# 2. Static type checking
npm run typecheck

# 3. Production build
npm run build

# 4. Start production server
npm run start
# (or during development: npm run dev)

# 5. Verify health endpoint from another terminal
curl http://127.0.0.1:3000/health
# Expected JSON response:
# {"status":"ok","timestamp":"2026-11-18T...","uptime":...}
```

---

## 7. Upcoming Phase 2 Steps (Database & Authentication)
- Install and configure PostgreSQL service/container.
- Initialize Prisma schema and initial migrations.
- Connect backend to development database via `DATABASE_URL`.
- Implement citizen authentication, persistent session management, and RBAC boundaries.
