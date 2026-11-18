# CivicLoop — Development Roadmap

Target demo: 24 November 2026. This is a proposed sequence, not a claim that any milestone is complete. Reassess dates against actual progress.

## Phase 0 — Documentation and decisions
- Complete and review project overview, requirements, architecture and contributor documentation.
- Confirm approved stack and API contract principles.
- Resolve minimum schema decisions needed for implementation.
- Confirm repository collaboration access and branch workflow.

Exit criteria: both tracks understand the MVP scope, task boundaries and shared contracts.

## Phase 1 — Project foundation
Backend track: initialize Node.js, TypeScript and Fastify; configure environment handling, health route, lint/type checks and test runner.
Frontend track: initialize React, TypeScript and Vite; establish a minimal responsive shell and agreed design tokens.
Shared: commit manifests and lockfiles, document exact commands and verify clean setup on both machines.

Exit criteria: frontend and backend run independently; no feature logic is required yet.

## Phase 2 — Database and authentication
Backend track: configure PostgreSQL and Prisma, create reviewed initial migrations, implement citizen authentication, persistent sessions and backend RBAC.
Frontend track: build login and registration forms against the agreed contract; handle loading, validation and error states.
Shared: test authentication and role boundaries.

## Phase 3 — Complaint core
Backend track: complaint creation, tracking IDs, ownership, listing and status history.
Frontend track: complaint submission, citizen complaint list, complaint detail and timeline UI.
Shared: integrate API and verify citizen workflow.

## Phase 4 — Authority operations
Backend track: authority-scoped queue, status transitions, rejection reasons and resolution records.
Frontend track: authority dashboard, filtering, complaint detail and status update UI.
Shared: test authority scope and complete status lifecycle.

## Phase 5 — MVP supporting modules
Backend track: rule-based duplicate suggestions, manual groups, evidence metadata/approval, notifications, ward analytics, deadlines, escalation and feedback.
Frontend track: corresponding review UI, upload states, analytics charts, notifications and feedback screens.
Shared: prioritize required workflows; defer any feature that threatens core workflow stability.

## Phase 6 — Stabilization and demo
- Run unit, API, database and end-to-end checks where feasible.
- Fix critical workflow, authorization and privacy defects.
- Prepare synthetic demo accounts and records.
- Verify setup and demo instructions on a clean environment.
- Prepare a concise walkthrough and disclose limitations.

## Scope protection
Do not add ML duplicate detection, image recognition, native mobile apps, municipal integrations, SMS/WhatsApp or automated government assignment to this MVP without explicit scope approval.

## Task sizing
Create small issues with one owner, a clear outcome, acceptance criteria and test steps. Swapnil's beginner frontend tasks should be broken into individual components or pages, not broad assignments such as build the entire frontend.