# CivicLoop — Development Roadmap

**MVP demonstration target:** 24 November 2026.  
This roadmap records the implementation sequence. Completion status is tracked in [PROJECT_PROGRESS.md](PROJECT_PROGRESS.md); planned features are not claims of implementation.

## Phase 0 — Documentation and decisions

**Status: Complete (project baseline documented).**

- Project overview, requirements, architecture and contributor guidance established.
- Approved stack and API contract principles recorded.
- Initial logical data model and privacy/security boundaries documented.
- Repository collaboration and pull-request workflow documented.

## Phase 1 — Application foundation

**Status: Complete · PR #1 merged.**

- Initialize the independent React + TypeScript + Vite frontend.
- Initialize the independent Fastify + TypeScript backend.
- Establish the initial frontend entry screen and backend health endpoint.
- Commit separate package manifests and lockfiles.
- Document setup and verification commands.

**Exit criteria met:** frontend and backend foundations exist independently; no product workflow is implied.

## Phase 2 — Database foundation

### Phase 2.1 — Local PostgreSQL infrastructure

**Status: Complete · PR #2 merged.**

- Configure PostgreSQL 16 using Docker Compose.
- Bind the host port to loopback and persist data in a named volume.
- Add a database health check and safe environment template.
- Document local setup and verification.

### Phase 2.2 — Prisma integration

**Status: Next.**

- Confirm Prisma version and configuration for the approved Node.js/PostgreSQL baseline.
- Add the Prisma CLI and client to the backend only.
- Establish a reusable Prisma client/plugin using Fastify lifecycle conventions.
- Keep authentication and complaint APIs out of this milestone.

### Phase 2.3 — Initial schema and migrations

**Status: Pending.**

- Review entity relationships, IDs, constraints and indexes before implementation.
- Create the initial Prisma schema and migration after approval.
- Add only approved reference data where appropriate.

### Phase 2.4 — Database connectivity and readiness

**Status: Pending.**

- Connect the backend to PostgreSQL through `DATABASE_URL`.
- Add a database readiness endpoint distinct from process liveness.
- Verify connection, migration workflow and failure handling.

## Phase 3 — Authentication and authorization

**Status: Pending.**

- Implement citizen registration and login.
- Add secure password hashing and persistent server-managed sessions.
- Enforce backend RBAC and complaint ownership boundaries.
- Provision authority accounts through administrators.
- Build corresponding frontend authentication screens against the agreed API contract.

## Phase 4 — Citizen complaint core

**Status: Pending.**

- Implement complaint creation, unique tracking IDs and ownership.
- Implement citizen complaint listing and detail retrieval.
- Record status history and expose a chronological citizen timeline.
- Build submission, list, detail and timeline UI.
- Integrate and verify the citizen workflow.

## Phase 5 — Authority operations

**Status: Pending.**

- Implement authority-scoped complaint queues and filters.
- Add permitted status transitions, rejection reasons and resolution records.
- Build the authority dashboard and complaint review interface.
- Verify ward/authority scope and status lifecycle.

## Phase 6 — MVP supporting modules

**Status: Pending.**

- Basic rule-based duplicate suggestions and authority-confirmed grouping.
- Evidence metadata, upload validation and explicit approval state.
- In-app notifications.
- Ward analytics.
- Configurable deadlines and authorized escalation.
- Citizen feedback after resolution.

Prioritize core workflows and privacy/security correctness over optional polish.

## Phase 7 — Stabilization and demo

**Status: Pending.**

- Run unit, API, database and end-to-end checks where feasible.
- Fix critical workflow, authorization and privacy defects.
- Prepare synthetic demo accounts and records.
- Verify setup and demo instructions on a clean environment.
- Prepare a concise walkthrough and disclose limitations.

## Scope protection

Do not add ML duplicate detection, image recognition, native mobile apps, municipal integrations, SMS/WhatsApp or automated government assignment to this MVP without explicit scope approval.

## Task sizing

Create small issues with one owner, a clear outcome, acceptance criteria and test steps. Beginner frontend tasks should be broken into individual components or pages, not broad assignments such as building the entire frontend.
