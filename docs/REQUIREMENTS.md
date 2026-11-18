# CivicLoop — MVP Requirements

**Version:** 1.0  
**Status:** Initial MVP baseline  
**Demonstration target:** 24 November 2026

## 1. Purpose

This document defines the functional scope, quality requirements and acceptance criteria for the CivicLoop MVP. It is the reference for implementation and demonstration planning.

## 2. User Roles

### Citizen
- Register, log in and log out.
- Submit civic complaints and optional supporting images.
- View and track their own complaints.
- Receive in-app notifications.
- View permitted public complaint information.
- Submit feedback after a complaint is resolved.

### Authority
- Log in using an administrator-provisioned account.
- View complaints within its permitted scope.
- Filter complaints by ward, category and status.
- Review potential duplicate suggestions.
- Group verified related complaints without deleting original reports.
- Update complaint status and add citizen-visible updates.
- Upload resolution evidence.
- View ward-level statistics and overdue complaints.

### Administrator
- Manage authority accounts and role access.
- Manage ward and complaint-category reference data.
- Monitor platform-wide complaints and escalations.
- View platform-level analytics.

## 3. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Citizen registration with input validation | Must |
| FR-02 | Secure login and logout | Must |
| FR-03 | Backend-enforced role-based access control | Must |
| FR-04 | Authority accounts provisioned by an administrator | Must |
| FR-05 | Complaint submission with title, description, category and ward/locality | Must |
| FR-06 | Optional supporting image upload with file validation | Must |
| FR-07 | Unique complaint tracking ID generation | Must |
| FR-08 | Citizen access to their own complaint records | Must |
| FR-09 | Authority dashboard for complaint review | Must |
| FR-10 | Complaint status updates with actor and timestamp history | Must |
| FR-11 | Citizen-visible chronological status timeline | Must |
| FR-12 | Public feed showing only approved, limited complaint information | Must |
| FR-13 | Rule-based suggestions for potentially related complaints | Must |
| FR-14 | Authority review and manual grouping of related complaints | Must |
| FR-15 | Preserve each complaint's original ID and record when grouped | Must |
| FR-16 | Resolution description and evidence upload by authorized officials | Must |
| FR-17 | Ward-level complaint counts and status analytics | Must |
| FR-18 | Configurable deadline and overdue complaint identification | Must |
| FR-19 | Authorized escalation of overdue complaints with history | Must |
| FR-20 | In-app notifications for submission and relevant updates | Must |
| FR-21 | Citizen feedback after resolution | Must |
| FR-22 | Administrative management of authority access and reference data | Must |

## 4. Complaint Data Requirements

A complaint should support the following fields:

- Unique complaint ID.
- Citizen/account reference.
- Title and description.
- Category.
- Ward or locality.
- Location details appropriate to the privacy policy.
- Optional citizen-submitted evidence.
- Current status.
- Creation and last-updated timestamps.
- Status history, including actor and timestamp.
- Related-complaint group reference, when applicable.
- Authority remarks with visibility classification.
- Resolution description and approved evidence, when resolved.
- Deadline and escalation history, when applicable.
- Citizen feedback, when submitted.

## 5. Initial Categories

1. Road damage
2. Garbage and sanitation
3. Water leakage
4. Streetlight issues
5. Drainage problems
6. Other civic issues

Categories should be configurable rather than hard-coded throughout the application.

## 6. Complaint Status Lifecycle

The initial status set is:

- **Submitted** — complaint has been received.
- **Under Review** — an authority is examining it.
- **In Progress** — work or follow-up has started.
- **Resolved** — the authority has recorded completion and resolution information.
- **Rejected** — the authority has rejected the complaint with a recorded reason.

Every status transition must be authorized and recorded. Rejected complaints must include a reason. A resolved complaint should include a resolution description; approved evidence should be attached when available.

## 7. Duplicate Detection Requirements

The MVP will use basic rule-based matching, not an AI/ML model.

Matching signals may include:

- Similarity between complaint titles and descriptions.
- Same or related category.
- Same ward or locality.
- Nearby coordinates, when reliable location coordinates are available.

The system should present possible matches with enough context for an authority to review them. A suggestion must not automatically delete, reject or merge a complaint.

Manual grouping must preserve the original complaint records and tracking IDs. The grouping relationship must be auditable and reversible by an authorized role.

## 8. Public Visibility and Privacy

### Publicly visible, after appropriate sanitization
- Complaint ID.
- General title and description.
- Category and ward/locality.
- Submission date.
- Current status and public timeline updates.
- Approved resolution description and evidence.

### Private or restricted
- Citizen name and contact details.
- Authentication credentials and session data.
- Exact residential address and sensitive location details.
- Private administrative notes.
- Unapproved evidence and internal review material.

Public endpoints must return only explicitly approved fields. Hiding information in the frontend is not sufficient; the backend must enforce these restrictions.

## 9. Notifications

The MVP will provide in-app notifications for:
- Successful complaint submission.
- Complaint status changes.
- Relevant authority updates.
- Resolution.
- Escalation, when appropriate.

Notifications should be associated with the intended user and should not disclose private information to other users.

## 10. Escalation

- A configurable deadline must be associated with the applicable complaint or category.
- Complaints past their deadline and not in a terminal state should be identifiable as overdue.
- Authorized administrators should be able to escalate an overdue complaint.
- Escalation must record the actor, timestamp and reason.
- Escalation must not automatically resolve or reject a complaint.

## 11. Non-Functional Requirements

### Security
- Store passwords using a suitable password-hashing algorithm.
- Enforce authentication, authorization and complaint ownership on the backend.
- Validate and restrict uploaded file types and sizes.
- Keep secrets and environment-specific configuration out of version control.
- Avoid exposing sensitive information in logs and API responses.

### Privacy
- Apply data minimization.
- Separate public updates from private administrative notes.
- Require approval before publishing resolution evidence.
- Restrict citizen access to their own private complaint information.

### Usability
- Provide responsive layouts for desktop and mobile browsers.
- Use clear labels, validation messages and status indicators.
- Keep the complaint submission and tracking workflows understandable.

### Reliability and Maintainability
- Persist application data in a database.
- Preserve complaint and status history.
- Handle failures with clear feedback.
- Keep frontend and backend responsibilities separated.
- Use modular code and document setup instructions.

### Performance
- Keep common dashboard and complaint operations responsive for the expected demonstration dataset.
- Avoid expensive duplicate comparisons across the entire dataset when a narrower candidate set can be used.

## 12. MVP Acceptance Criteria

The MVP is demonstration-ready when:

1. A citizen can register, log in and log out.
2. An administrator can provision an authority account.
3. Backend role checks prevent unauthorized operations.
4. A citizen can submit a complaint and receive a unique ID.
5. A valid supporting image can be uploaded and associated with a complaint.
6. A citizen can view and track their own complaint.
7. An authority can review a complaint and update its status.
8. Status history appears in chronological order.
9. Similar complaints can be suggested by the rule-based matcher.
10. An authority can verify and group related complaints without losing their original records.
11. Ward analytics display counts consistent with stored complaint data.
12. Overdue complaints can be identified and escalated by an authorized role.
13. Citizens receive relevant in-app notifications.
14. An authority can attach resolution information and evidence.
15. A citizen can submit feedback after resolution.
16. Public views do not expose private citizen or administrative information.
17. Data remains available after the application is restarted.

## 13. Out of Scope for the November 24 MVP

- Advanced machine-learning or semantic duplicate detection.
- Automatic image recognition.
- Native Android or iOS applications.
- Direct integration with municipal or government grievance systems.
- SMS, WhatsApp or external push-notification delivery.
- Automated government-department assignment.
- Production-grade government identity verification.

These may be considered after the MVP has been demonstrated and evaluated.

## 14. Demonstration Integrity

Demonstration accounts and sample complaints must be clearly identified as test data. The demonstration must not imply official municipal integration, government endorsement or real-world resolution of sample complaints.
