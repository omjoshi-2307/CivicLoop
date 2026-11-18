# CivicLoop — Project Overview

**Tagline:** Complaints That Don't Disappear  
**Program:** Anveshana 2026–27  
**MVP demonstration target:** 24 November 2026  
**Document status:** Project baseline; implementation in progress

## 1. What is CivicLoop?

CivicLoop is a citizen-centric civic grievance management platform intended to make public-issue reporting, complaint tracking and resolution updates more transparent and accountable.

Citizens can report local civic issues, attach supporting evidence and follow the progress of their complaints. Authorized officials can review reports, update their status, provide resolution evidence and monitor complaint activity across wards.

The platform also uses basic rule-based matching to identify potentially related complaints so officials can review reports concerning the same issue together.

## 2. Problem Statement

Citizens need a clear way to report civic issues and understand what happens after submission. When complaint progress is difficult to follow, updates are inconsistent or similar reports are handled independently, public trust and administrative visibility can suffer.

CivicLoop aims to connect reporting, review, progress tracking and resolution evidence in one traceable workflow.

## 3. Objectives

- Make civic complaint submission straightforward.
- Give every complaint a unique tracking identifier.
- Provide a visible, chronological record of status changes.
- Help officials identify potentially related complaints.
- Support evidence-backed resolution updates.
- Provide ward-level operational statistics.
- Highlight overdue complaints and support escalation.
- Protect citizens' personal information.

## 4. Target Users

### Citizens
Register, submit complaints, attach evidence, track their own reports, receive in-app updates and provide feedback after resolution.

### Authorities
Review complaints, manage statuses, examine duplicate suggestions, add public updates, upload approved resolution evidence and monitor ward-level statistics.

### Administrators
Manage authority access and platform configuration, monitor complaints and escalations, and review overall analytics.

## 5. Core Modules

1. **Authentication and access control** — secure registration, login and role-based permissions.
2. **Citizen complaint management** — complaint submission, evidence attachment and tracking IDs.
3. **Authority operations** — complaint review, status updates and resolution records.
4. **Duplicate intelligence** — rule-based suggestions and authority-reviewed grouping.
5. **Public transparency** — limited public complaint information and status timelines.
6. **Ward analytics** — complaint counts and status summaries by ward.
7. **Accountability** — overdue identification and administrative escalation.
8. **Notifications and feedback** — in-app updates and citizen feedback after resolution.

## 6. Core Workflow

1. A citizen registers or logs in.
2. The citizen submits a complaint with its category, ward or locality, description and optional image.
3. CivicLoop creates a unique complaint ID.
4. The system checks for potentially related reports.
5. An authorized official reviews the complaint and updates its status.
6. The citizen can follow the status timeline and receive in-app notifications.
7. The official records the resolution and uploads approved evidence.
8. The citizen can submit feedback after resolution.

## 7. MVP Scope

The first demonstration is planned to include full authentication, role-based access, complaint submission and tracking, basic duplicate detection, manual grouping, limited public visibility, ward analytics, resolution evidence, overdue escalation, in-app notifications and citizen feedback.

Advanced machine learning, native mobile applications, external government-portal integrations, SMS/WhatsApp notifications and automated image recognition are outside the initial MVP scope.

## 8. Privacy Principles

- Public views must not expose citizen contact details, credentials or exact residential addresses.
- Citizens can access their own complaint details after authentication.
- Private administrative notes must remain restricted.
- Evidence must be reviewed and approved before public display.
- Backend authorization must enforce role and ownership checks.

## 9. Project Status

The implementation foundation is in place: Phase 1 established the independent React/Vite frontend and Fastify backend, and Phase 2.1 added local PostgreSQL 16 infrastructure through Docker Compose. These milestones are merged into `main` (PR #1 and PR #2).

Prisma integration, the initial database schema and migrations, authentication, RBAC, and citizen/authority complaint workflows have not yet been implemented. The features described in this overview are planned MVP scope, not claims of completed functionality.

See [PROJECT_PROGRESS.md](PROJECT_PROGRESS.md) for the current milestone tracker. Approved technology choices are recorded in [DECISIONS.md](DECISIONS.md). Hosting and production file-storage choices remain undecided.
