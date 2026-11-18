# CivicLoop

**Complaints That Don't Disappear**

A citizen-centric civic grievance platform for transparent complaint tracking, duplicate issue clustering, and evidence-based public accountability.

## Start here

New contributors should read these documents in order:

1. [Project Overview](docs/PROJECT_OVERVIEW.md) — problem, users and workflow.
2. [Requirements](docs/REQUIREMENTS.md) — agreed MVP scope and acceptance expectations.
3. [Technology Stack Explained](docs/TECH_STACK_EXPLAINED.md) — what each technology does and why it is used.
4. [Architecture](docs/ARCHITECTURE.md) — system boundaries and modules.
5. [Dependencies](docs/DEPENDENCIES.md) — installed and planned packages and their purposes.
6. [Development Setup](docs/DEVELOPMENT_SETUP.md) — local setup process.
7. [API Contract](docs/API_CONTRACT.md) — frontend/backend interface agreement.
8. [Data Model](docs/DATA_MODEL.md) — logical database entities and relationships.
9. [Security and Privacy](docs/SECURITY_PRIVACY.md) — mandatory security and privacy rules.
10. [Testing](docs/TESTING.md) — verification strategy.
11. [Development Roadmap](docs/DEVELOPMENT_ROADMAP.md) — planned implementation sequence.
12. [Project Progress](docs/PROJECT_PROGRESS.md) — current completed, in-progress and pending milestones.
13. [Decision Log](docs/DECISIONS.md) — approved choices and pending decisions.
14. [Glossary](docs/GLOSSARY.md) — project terminology.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before making changes. Work on a focused feature branch and open a pull request for review. Keep `main` stable and wait for project-lead approval before merging.

## Project status

The repository has completed the initial application foundation (Phase 1) and local PostgreSQL infrastructure (Phase 2.1). The frontend and backend are separate TypeScript applications; PostgreSQL 16 is configured for local development through Docker Compose. Prisma integration, the initial database schema, authentication, RBAC and citizen/authority complaint workflows remain pending. See [Project Progress](docs/PROJECT_PROGRESS.md) for the current implementation status. Planned features are not claims of completed functionality.

**MVP demonstration target:** 24 November 2026  
**Program:** Anveshana 2026–27  
**License:** MIT
