# CivicLoop — Data Model

Status: logical model baseline. This is not a finalized Prisma schema or migration. Exact columns, types, indexes, nullability and deletion policies must be reviewed before implementation.

## 1. Design principles
- Use relational constraints to preserve data integrity.
- Use stable primary identifiers and foreign keys.
- Store timestamps consistently, preferably as timezone-aware values.
- Preserve complaint and status history for auditability.
- Separate public content from private/internal information.
- Store evidence files outside ordinary relational rows; keep metadata and access rules in PostgreSQL.

## 2. Logical entities
| Entity | Purpose |
|---|---|
| User | Citizen, authority or administrator identity, credentials reference and account state |
| Ward | Configurable ward reference data |
| Category | Configurable complaint category |
| Complaint | Complaint details, owner, category, ward, status and tracking ID |
| ComplaintStatusHistory | Append-only record of status transitions, actor and time |
| ComplaintGroup | Authority-confirmed relationship among related complaints |
| ComplaintGroupMember | Join records connecting complaints to a group |
| Evidence | File metadata, uploader, complaint, classification and approval state |
| Notification | User-specific message and read state |
| Escalation | Overdue escalation reason, actor, status and timestamp |
| Feedback | Citizen feedback associated with a resolved complaint |

## 3. Relationship outline
- One user may submit many complaints.
- Each complaint has one citizen owner.
- Each complaint references a category and may reference a ward.
- One complaint has many status-history entries.
- One complaint may have many evidence records.
- A complaint group has many membership records; a complaint's membership rules must prevent unintended duplicate memberships.
- One user may receive many notifications.
- A complaint may have escalation records and at most the feedback allowed by the final product rule.

## 4. Important integrity rules
- Tracking IDs must be unique and non-guessable enough for their intended use; authorization is still required for private details.
- Complaint ownership must be enforced in backend queries, not only in the UI.
- Status changes must record actor, previous status, new status and timestamp.
- Rejected complaints require a reason.
- Resolution records require a description.
- Grouping never deletes or overwrites original complaint records.
- Evidence approval and public visibility must be explicit states.
- Feedback must be accepted only when the complaint meets the approved resolved-state rule.

## 5. Status lifecycle
Initial statuses: Submitted, Under Review, In Progress, Resolved and Rejected. Allowed transitions and any reopening policy must be defined in backend business rules and tested. Every transition is audited.

## 6. Evidence metadata
Store metadata such as evidence ID, complaint ID, uploader ID, storage key, original filename (sanitized), detected media type, byte size, checksum if required, upload timestamp, approval state and visibility. Do not store unrestricted public file paths or trust the browser-provided MIME type.

## 7. Indexing considerations
Likely indexes include unique tracking ID, complaint owner plus creation time, status plus ward, status-history complaint plus timestamp, notification recipient plus read state, and foreign keys used in frequent joins. Confirm indexes using actual query patterns.

## 8. Open schema decisions
- Exact ID strategy.
- Whether users can belong to multiple authority scopes.
- Ward assignment model for authorities.
- Exact complaint location representation and precision.
- Duplicate group membership and group lifecycle rules.
- Evidence storage provider and retention policy.
- Feedback scale and cardinality.
- Deadline policy and timezone handling.

Resolve these in docs/DECISIONS.md before generating the production Prisma schema.