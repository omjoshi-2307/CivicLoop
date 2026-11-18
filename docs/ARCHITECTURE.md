# CivicLoop — Architecture

**Version:** 0.1  
**Status:** Initial logical architecture  
**Technology stack:** To be finalized before implementation  
**MVP demonstration target:** 24 November 2026

## 1. Architecture Goals

The CivicLoop architecture should:

- Separate the user interface, application logic and data persistence.
- Enforce authentication, authorization and privacy on the server.
- Support citizen, authority and administrator workflows.
- Keep complaint history and administrative actions traceable.
- Make duplicate detection replaceable as the project evolves.
- Remain small enough to implement and test within the MVP timeline.

This document describes logical boundaries and data responsibilities. It does not claim that the components have already been implemented.

## 2. High-Level System

```text
                 ┌────────────────────────────┐
                 │       Web Frontend         │
                 │                            │
                 │  Citizen | Authority | Admin│
                 └─────────────┬──────────────┘
                               │ HTTPS / API
                 ┌─────────────▼──────────────┐
                 │       Backend API          │
                 │                            │
                 │ Authentication & RBAC      │
                 │ Complaint Management       │
                 │ Status & Timeline          │
                 │ Duplicate Matching         │
                 │ Evidence & Notifications   │
                 │ Analytics & Escalation     │
                 └─────────────┬──────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
      ┌───────▼───────┐ ┌──────▼──────┐ ┌──────▼──────┐
      │   Database    │ │ File Storage│ │ Background  │
      │               │ │             │ │ Processing  │
      │ Users         │ │ Complaint   │ │ Overdue     │
      │ Complaints    │ │ Evidence    │ │ Checks      │
      │ Status History│ │ Resolution  │ │ Notifications│
      │ Groups        │ │ Evidence    │ │ (if needed) │
      └───────────────┘ └─────────────┘ └─────────────┘
```

The diagram is technology-neutral. The final deployment may combine or simplify components depending on the selected stack.

## 3. Repository Boundaries

```text
CivicLoop/
├── README.md
├── LICENSE
├── .gitignore
├── docs/
│   ├── PROJECT_OVERVIEW.md
│   ├── REQUIREMENTS.md
│   └── ARCHITECTURE.md
├── frontend/
├── backend/
└── .github/
    ├── ISSUE_TEMPLATE/
    └── pull_request_template.md
```

### frontend/
Contains the browser-based application:
- Citizen-facing pages and workflows.
- Authority dashboard.
- Administrator dashboard.
- Shared UI components and client-side validation.
- API client and session-aware navigation.

The frontend must not be trusted to enforce permissions by itself.

### backend/
Contains:
- Authentication and session/token handling.
- Role and ownership authorization.
- Complaint and status lifecycle logic.
- Duplicate candidate generation and grouping rules.
- Evidence metadata and upload validation.
- Notifications, escalation and analytics APIs.
- Database access and server-side validation.

### docs/
Contains project scope, requirements and architecture decisions.

### .github/
Contains contribution templates and repository collaboration guidance.

## 4. Logical Backend Modules

### Authentication and Authorization
Responsible for registration, login, logout/session handling, password hashing and role checks.

### User and Role Management
Responsible for citizen accounts, administrator-managed authority accounts and role assignments.

### Complaint Management
Responsible for complaint creation, tracking IDs, categories, ward references, ownership and complaint retrieval.

### Status and Timeline
Responsible for permitted status transitions, public updates and immutable or append-only status history.

### Duplicate Intelligence
Responsible for selecting candidate complaints, calculating basic similarity signals and presenting suggestions. It must not automatically merge or delete reports.

### Evidence Management
Responsible for upload validation, storage references, access control and approval before public display.

### Notifications
Responsible for creating and retrieving user-specific in-app notifications.

### Analytics and Escalation
Responsible for ward-level aggregation, deadline checks, overdue identification and escalation records.

## 5. Initial Data Model

The following entities are logical design candidates. Exact fields, relationships and database types will be finalized after the database technology is selected.

| Entity | Responsibility |
|---|---|
| User | Identity, credentials and role |
| Ward | Ward identifier and display information |
| Category | Configurable complaint categories |
| Complaint | Main complaint record and ownership |
| ComplaintStatusHistory | Status transitions, actor and timestamps |
| ComplaintGroup | Authority-verified relationship between reports |
| ComplaintGroupMember | Complaints associated with a group |
| Evidence | File metadata, uploader, type and approval visibility |
| Notification | User-specific in-app messages and read state |
| Escalation | Escalation reason, actor and timestamp |
| Feedback | Citizen rating and optional comments |

### Relationship overview

- One citizen can submit many complaints.
- Each complaint belongs to one citizen.
- Each complaint references a category and, where applicable, a ward.
- Each complaint can have many status-history entries.
- Each complaint can have multiple evidence records.
- A verified complaint group can contain multiple complaints.
- A user can receive many notifications.
- A complaint can have escalation records and, after resolution, citizen feedback.

## 6. Complaint Lifecycle

Initial lifecycle:

```text
Submitted
    |
    v
Under Review
    |
    v
In Progress
    |
    v
Resolved

Under Review / In Progress
    |
    v
Rejected (with reason)
```

Only authorized backend operations may change a complaint's status. Every transition must record the previous and new status, actor and timestamp.

## 7. Duplicate Detection Design

The initial matcher will be rule-based.

### Candidate selection
Narrow candidate complaints using available category, ward/locality and location information.

### Similarity signals
- Normalized title and description token similarity.
- Category equality or configured category relationship.
- Ward/locality match.
- Geographic proximity when coordinates are available.

### Review workflow
1. A new complaint is stored.
2. The backend finds a limited set of plausible candidates.
3. The matcher calculates simple similarity signals.
4. Potential matches are presented to an authorized official.
5. The official confirms or dismisses the suggestion.
6. Confirmed relationships are stored as a group while preserving every original complaint.

The first implementation should favor explainable rules over a complex model. Matching thresholds must be configurable and tested against sample cases.

## 8. Privacy and Security Boundaries

- All protected API operations require authentication.
- Role and ownership checks run on the backend.
- Public API responses use an explicit allowlist of fields.
- Private administrative remarks are never returned by public endpoints.
- Evidence files are private by default.
- Public evidence requires an explicit approval state.
- Uploads require type, size and content validation appropriate to the chosen storage approach.
- Passwords are hashed; plaintext passwords are never stored.
- Secrets are supplied through environment configuration and excluded from Git.

## 9. API Resource Areas

Exact routes and payload schemas will be defined during implementation. Expected API areas include:

| Resource area | Responsibility |
|---|---|
| Authentication | Registration, login and logout |
| Users | Current profile and permitted account management |
| Wards | Ward reference data |
| Categories | Complaint category reference data |
| Complaints | Create, list, retrieve and update permitted complaint fields |
| Timeline | Complaint status history and public updates |
| Duplicate suggestions | Candidate matches and authority review |
| Groups | Create and manage verified complaint groups |
| Evidence | Upload, retrieve and approve evidence |
| Notifications | List and mark user notifications as read |
| Analytics | Ward and status summaries |
| Escalations | Overdue cases and escalation actions |
| Feedback | Submit and retrieve permitted resolution feedback |

## 10. Operational Considerations

- Persist all important records in a database.
- Store uploaded files outside the source-code repository.
- Keep file metadata and approval state in the database.
- Use pagination or bounded queries for complaint lists.
- Avoid unbounded all-to-all duplicate comparisons.
- Record important administrative actions.
- Provide environment examples without committing real secrets.
- Include setup, migration and test instructions as implementation progresses.

## 11. Technology Decisions

The following choices are intentionally pending:

| Area | Decision |
|---|---|
| Frontend framework | To be finalized |
| Styling and component system | To be finalized |
| Backend framework/runtime | To be finalized |
| Database | To be finalized |
| Authentication/session strategy | To be finalized |
| File storage | To be finalized |
| Hosting/deployment | To be finalized |
| Testing tools | To be finalized |

Do not initialize framework-specific project files until these decisions are agreed and recorded.

## 12. Architecture Decision Log

| Decision | Current direction | Reason |
|---|---|---|
| Application form | Responsive web application | One browser-based experience for all roles |
| User roles | Citizen, authority, administrator | Separate responsibilities and permissions |
| Authentication | Full authentication | Real accounts and backend-enforced access |
| Duplicate detection | Basic rule-based matching | Explainable and achievable for the MVP |
| Duplicate grouping | Authority-confirmed | Avoid incorrect automatic merging |
| Public visibility | Limited | Protect personal and administrative information |
| Notifications | In-app first | Keeps initial delivery manageable |
| Evidence | Private by default; approved for public display | Privacy and accountability |
| Data persistence | Database-backed | Records must survive restarts |

Update this log whenever a technical decision is finalized.
