# CivicLoop — Development Setup

**Status:** Phase 2.1 Database Infrastructure Configured (PostgreSQL 16 Docker Compose Established)
**Applies to:** Frontend and backend contributors  
**Baseline Node.js:** Node.js 26 LTS (Verified on Node.js `v26.13.0`, npm `11.20.0`)  

---

## 1. Prerequisites
- **Git**
- **Node.js**: Node.js 26 LTS baseline (tested and verified with Node.js `v26.13.0`).
- **npm**: npm `11.20.0` (use npm exclusively; do not mix package managers).
- **Docker & Docker Compose**: Required for running the local PostgreSQL 16 container (Docker Compose v2+ / Docker Desktop).
- **PostgreSQL**: PostgreSQL 16 (provided locally via Docker Compose).
- **Editor**: VS Code or preferred editor with TypeScript support.

---

## 2. Clone Repository

Clone the repository:

```bash
git clone https://github.com/omjoshi-2307/CivicLoop.git
cd CivicLoop
```

---

## 3. Application Layout & Ports

The repository contains two independent TypeScript applications and local database infrastructure:

```text
CivicLoop/
├── docker-compose.yml      # Local PostgreSQL 16 container definition
├── .env.example            # Root template for PostgreSQL credentials & DATABASE_URL
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
| Service / Application | Default Port | Host Binding | Key Endpoints / Health |
|---|---|---|---|
| **Frontend** | `5173` | `localhost` | `http://localhost:5173/` |
| **Backend** | `3000` | `127.0.0.1` / `0.0.0.0` | `GET http://127.0.0.1:3000/health` |
| **PostgreSQL** | `5432` | `127.0.0.1` | `127.0.0.1:5432` (`pg_isready` health check) |

---

## 4. Environment Configuration

Configuration is managed via untracked `.env` files. Safe template files are provided at the root and in each subproject:

- Root `.env.example` (PostgreSQL container & local database connection):
  ```env
  POSTGRES_USER=civicloop_user
  POSTGRES_PASSWORD=civicloop_dev_password_change_me
  POSTGRES_DB=civicloop_dev
  POSTGRES_PORT=5432
  DATABASE_URL=postgresql://civicloop_user:civicloop_dev_password_change_me@127.0.0.1:5432/civicloop_dev?schema=public
  ```
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

Copy the templates to create local configuration:
```bash
# Root (PostgreSQL & Docker Compose)
cp .env.example .env

# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

### Critical Local `.env` Configuration Rules:
1. **Replace Placeholder Passwords Before Starting PostgreSQL:**
   After copying `.env.example` to `.env`, open your local `.env` file and change the default placeholder password (`civicloop_dev_password_change_me`) to your own local development password before launching the PostgreSQL container.
2. **Synchronize `POSTGRES_PASSWORD` and `DATABASE_URL`:**
   Ensure `POSTGRES_PASSWORD` and the password in `DATABASE_URL` match exactly:
   ```env
   POSTGRES_USER=civicloop_user
   POSTGRES_PASSWORD=your_secure_local_password
   POSTGRES_DB=civicloop_dev
   POSTGRES_PORT=5432
   DATABASE_URL=postgresql://civicloop_user:your_secure_local_password@127.0.0.1:5432/civicloop_dev?schema=public
   ```
   If these values diverge, the PostgreSQL container will initialize using `POSTGRES_PASSWORD`, but backend connections via `DATABASE_URL` will fail authentication.
3. **Port Consistency Between `POSTGRES_PORT` and `DATABASE_URL`:**
   `POSTGRES_PORT` controls the host port exposed by Docker Compose on `127.0.0.1`. The default port remains `5432`. If `POSTGRES_PORT` is changed to avoid a local port collision (for example, setting `POSTGRES_PORT=5433`), the port in `DATABASE_URL` must be updated to match (for example, `postgresql://civicloop_user:your_secure_local_password@127.0.0.1:5433/civicloop_dev?schema=public`).
4. **Never Commit `.env`:**
   Real `.env` files contain sensitive local credentials and **must never be committed** to Git or pushed to remote repositories. The active `.env` file is strictly ignored by `.gitignore` (only `.env.example` files are committed as sanitized templates).

---

## 5. Database Setup & Verification (PostgreSQL 16 via Docker Compose)

Local database infrastructure is defined in `docker-compose.yml` using the official `postgres:16` image.

### Database Specifications
- **Service & Container:** `civicloop-postgres`
- **Image:** `postgres:16`
- **Host Binding:** `127.0.0.1:${POSTGRES_PORT:-5432}:5432` (strictly bound to loopback; never exposed on external interfaces)
- **Database:** `civicloop_dev` (configurable via `POSTGRES_DB`)
- **User:** `civicloop_user` (configurable via `POSTGRES_USER`)
- **Volume:** `civicloop_postgres_data` (named persistent volume)
- **Restart Policy:** `unless-stopped`
- **Health Check:** `pg_isready -U ${POSTGRES_USER:-civicloop_user} -d ${POSTGRES_DB:-civicloop_dev}`

### Commands

Before running Docker Compose, verify that your root `.env` already exists and is configured with your local database credentials (see Section 4). **Do not overwrite an existing `.env` file** (do not re-run `cp .env.example .env`), as doing so will overwrite your configured passwords.

```bash
# 1. Validate Docker Compose configuration
docker compose config
# (or: docker-compose config)

# 2. Start PostgreSQL container in background
docker compose up -d

# 3. Check container status and health status (wait until 'healthy')
docker compose ps

# 4. View container logs
docker compose logs -f postgres

# 5. Verify database readiness directly with pg_isready
docker compose exec postgres pg_isready

# 6. Connect via psql inside the container (default configuration example)
# Note: If POSTGRES_USER or POSTGRES_DB were customized in .env, replace 'civicloop_user' and 'civicloop_dev' with your configured values.
docker compose exec -it postgres psql -U civicloop_user -d civicloop_dev

# 7. Stop the database container (preserves volume data)
docker compose down

# CAUTION: Do NOT use 'docker compose down -v' unless you want to destroy persistent data.
```

---

## 6. Frontend Setup & Verification

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

## 7. Backend Setup & Verification

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

## 8. Upcoming Phase 2 Steps (Database & Authentication)
- [x] Phase 2.1: Configure PostgreSQL 16 local infrastructure via Docker Compose.
- [ ] Phase 2.2: Initialize Prisma schema and create initial migrations.
- [ ] Phase 2.3: Connect backend to development database via `DATABASE_URL`.
- [ ] Phase 2.4: Implement citizen authentication, persistent session management, and RBAC boundaries.
