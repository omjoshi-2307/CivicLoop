# CivicLoop — Architecture Decision Log

Purpose: record decisions, rationale, status and unresolved questions so contributors and coding agents do not make conflicting assumptions.

## Approved decisions

### ADR-001 — Relational database
- Status: Approved
- Decision: PostgreSQL.
- Rationale: CivicLoop stores strongly related entities and needs transactions, constraints and relational reporting.

### ADR-002 — Frontend stack
- Status: Approved baseline
- Decision: React + TypeScript + Vite, with Tailwind CSS and shadcn/ui for UI development.
- Rationale: component-based interface, type safety and efficient development.

### ADR-003 — Backend stack
- Status: Approved baseline
- Decision: Node.js + TypeScript + Fastify.
- Rationale: modular API server and shared TypeScript ecosystem.

### ADR-004 — Database access
- Status: Approved baseline
- Decision: Prisma ORM with PostgreSQL.
- Rationale: typed queries and versioned schema migrations.

### ADR-005 — Application architecture
- Status: Approved baseline
- Decision: modular monolith with a versioned REST API under /api/v1.
- Rationale: easier to build, test and deploy within MVP constraints than distributed services.

### ADR-006 — Authentication approach
- Status: Approved direction; implementation details pending
- Decision: Argon2id password hashing and server-managed cookie sessions.
- Pending: select and test a persistent PostgreSQL-compatible session store and finalize cookie/CSRF configuration.

### ADR-007 — Hosting
- Status: Undecided
- Decision: no hosting provider selected. Develop locally first and keep configuration provider-neutral.

### ADR-008 — Evidence storage
- Status: Undecided
- Decision: store file metadata and access/approval state in PostgreSQL; production file-storage provider remains open.

## Product decisions already in the MVP baseline
- Full authentication.
- Basic rule-based duplicate detection; no ML model in the MVP.
- Limited public visibility with sanitized fields.
- Ward analytics, evidence, escalation, feedback and in-app notifications.
- Authority accounts are administrator-provisioned.
- Duplicate grouping is manually confirmed and preserves original complaint records and IDs.

## Open decisions before implementation
- Exact Node.js major version and package versions.
- Session-store adapter and CSRF strategy.
- Final Prisma schema, ID strategy and authority-to-ward assignment model.
- Exact API payload schemas, pagination and error envelope.
- File storage provider, upload limits and retention.
- Local ports, CORS configuration and production topology.
- Whether browser end-to-end testing fits the MVP schedule.

## Change process
Propose changes with context, alternatives, impact and migration implications. The project lead approves shared architecture and API changes. Update this log and affected documents in the same pull request.