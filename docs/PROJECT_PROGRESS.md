# CivicLoop — Project Progress

**Last updated:** 18 November 2026  
**Program:** Anveshana 2026–27  
**MVP demonstration target:** 24 November 2026  
**Source of truth:** Merged code on `main`, merged pull requests, and verified contributor reports.

> This file tracks implementation progress. A planned requirement is not considered implemented until the code is present and its relevant verification has been completed. Update this file whenever a milestone is completed or its scope/status changes.

## Current status

**Overall stage:** Development foundation established; database integration is the next task.

| Area | Status | Evidence / notes |
|---|---|---|
| Repository and contributor documentation | In progress / maintained | Project baseline, requirements, architecture, setup and contribution guidance exist |
| Frontend application foundation | Complete | Phase 1 merged in PR #1 |
| Backend application foundation | Complete | Phase 1 merged in PR #1; includes the initial health endpoint |
| Local PostgreSQL infrastructure | Complete | Phase 2.1 merged in PR #2 |
| Prisma integration | Not started | Next planned implementation task |
| Initial database schema and migrations | Not started | Requires schema review before implementation |
| Database readiness integration | Not started | Keep liveness and database readiness distinct |
| Authentication and RBAC | Not started | Separate milestone after database foundation |
| Complaint workflows | Not started | Not yet implemented |
| Authority operations | Not started | Not yet implemented |
| Duplicate detection and supporting modules | Not started | Planned; not implemented |
| Demo hardening | Not started | Requires end-to-end workflow and privacy verification |

## Completed milestones

### Phase 0 — Project planning baseline

- Project purpose, MVP requirements, user roles and scope documented.
- Architecture, API contract, data model, security/privacy and testing plans recorded.
- Contributor responsibilities and PR workflow documented.

### Phase 1 — Application foundation

**Status: Complete · PR #1 merged**

- Independent React + TypeScript + Vite frontend application.
- Independent Fastify + TypeScript backend application.
- Initial frontend entry screen and backend `GET /health` endpoint.
- Separate frontend/backend package manifests and lockfiles.
- Development setup and dependency documentation.

The implementation and verification details are recorded in the Phase 1 PR and development documentation. Do not infer that citizen or authority product workflows are complete from this foundation.

### Phase 2.1 — PostgreSQL infrastructure

**Status: Complete · PR #2 merged**

- PostgreSQL 16 local service defined through Docker Compose.
- Host port bound to loopback (`127.0.0.1`).
- Persistent named Docker volume.
- PostgreSQL health check using `pg_isready`.
- Root `.env.example` and setup instructions.
- Local PostgreSQL container was reported healthy and accepting connections.
- Real `.env` credentials remain local and must never be committed.

**Merge commit:** `9e7e6bf4a52c2ddf4a1fa819722861a866622a0f`  
**PR:** [#2 — PostgreSQL Docker infrastructure](https://github.com/omjoshi-2307/CivicLoop/pull/2)

## Next implementation milestone

### Phase 2.2 — Prisma integration planning and foundation

Proceed in small, reviewable steps:

1. Inspect the latest `main` branch and current backend package/configuration.
2. Confirm a Prisma version compatible with the repository's Node.js and PostgreSQL baseline.
3. Decide Prisma configuration and Fastify plugin/client lifecycle.
4. Review the initial data model before writing schema or migrations.
5. Implement Prisma setup on a focused feature branch only after the plan is approved.
6. Verify generation, migration workflow and database connectivity without adding authentication or complaint APIs.

**Scope boundary:** Phase 2.2 must not silently expand into authentication, sessions, RBAC, complaint endpoints or frontend feature work.

## Remaining roadmap

| Sequence | Milestone | Status |
|---|---|---|
| 2.2 | Prisma integration foundation | Next |
| 2.3 | Initial schema and reviewed migrations | Pending |
| 2.4 | Backend database connection and readiness | Pending |
| 3 | Authentication, sessions and RBAC | Pending |
| 4 | Citizen complaint creation, tracking and timeline | Pending |
| 5 | Authority complaint operations | Pending |
| 6 | MVP supporting modules: duplicate suggestions, evidence, notifications, analytics, escalation and feedback | Pending |
| 7 | Stabilization, security/privacy checks and demo preparation | Pending |

The detailed planned sequence and acceptance expectations remain in [DEVELOPMENT_ROADMAP.md](DEVELOPMENT_ROADMAP.md) and [REQUIREMENTS.md](REQUIREMENTS.md).

## Project constraints and working rules

- Keep `main` stable. Use a focused branch and pull request for each logical change.
- Do not merge a PR until the project lead has reviewed and explicitly approved it.
- Keep backend, frontend and shared API contracts aligned; agree on contract changes before parallel implementation.
- Assign beginner frontend work as small, independently demonstrable tasks with acceptance criteria.
- Do not add dependencies or change architecture without recording the reason and getting approval.
- Use synthetic, clearly labelled demo data. Do not imply municipal integration, government endorsement or real-world resolution.
- Keep citizen personal data, private notes, credentials and unapproved evidence out of public responses.
- Never commit local `.env` files, real credentials or private data.
- Do not run `docker compose down -v` unless intentionally deleting the persistent database volume.

## How to maintain this file

For each update:
1. Confirm the relevant code is merged into `main` or clearly label it as in progress on a branch/PR.
2. Record the PR or commit reference.
3. Record the verification actually performed and by whom; distinguish automated checks from contributor-reported local checks.
4. Move a milestone to **Complete** only when its exit criteria are met.
5. Update the next milestone and any changed risks or scope boundaries.

