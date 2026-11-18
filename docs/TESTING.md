# CivicLoop — Testing Strategy

Status: test plan. Test scripts and coverage will be added as modules are implemented.

## 1. Testing goals
- Verify required user workflows.
- Protect authorization and privacy boundaries.
- Detect regressions in complaint lifecycle and history.
- Confirm duplicate suggestions are explainable and never auto-merge records.
- Verify the frontend and backend agree on API contracts.

## 2. Test levels
| Level | What to test | Candidate tooling |
|---|---|---|
| Unit | Validation, status rules, duplicate scoring, deadline calculations | Vitest |
| Component | Forms, status views, navigation and accessible interactions | Vitest + Testing Library |
| API integration | Routes, sessions, permissions, persistence and errors | Supertest or Fastify injection |
| Database integration | Constraints, relations, migrations and transactions | PostgreSQL test database + Prisma |
| End-to-end | Citizen and authority workflows in browser | Tool to be selected if time permits |

## 3. Priority scenarios
### Authentication and access
- Valid citizen registration and login.
- Invalid credentials are rejected without revealing sensitive account details.
- Logout invalidates the session.
- Citizen cannot access another citizen's private complaint.
- Authority cannot act outside its permitted ward or assignment.
- Admin-only account management rejects non-admin users.

### Complaint workflow
- Valid complaint creates a unique tracking ID.
- Required fields are validated.
- Citizen can view own complaint and timeline.
- Status changes record actor and timestamp.
- Rejection requires a reason.
- Resolution requires a description.

### Duplicate detection
- Similar complaints in the same locality can be suggested.
- Dissimilar complaints are not automatically grouped.
- Authority can confirm or dismiss suggestions.
- Grouping preserves all original complaint IDs and records.

### Privacy and evidence
- Public feed excludes citizen identity and private location details.
- Unapproved evidence cannot be fetched publicly.
- Unsupported and oversized uploads are rejected.
- Approved evidence is only exposed through the intended public-safe path.

### Notifications, analytics and escalation
- Notifications belong only to their intended user.
- Ward aggregates respect authority scope.
- Overdue detection uses the configured deadline and timezone rules.
- Escalation records actor, time and reason.
- Feedback is accepted only under the approved resolved-complaint rule.

## 4. Test data
Use synthetic users, wards, categories and complaints. Never place real personal information, credentials or production data in fixtures.

## 5. Pull request verification
Every code PR should state which tests were run and their results. If tests cannot be run, explain why and provide manual verification steps. Do not claim tests passed without executing them.

## 6. Release readiness
- [ ] Required MVP flows pass.
- [ ] Authorization and ownership tests pass.
- [ ] Public/private data tests pass.
- [ ] Database migrations work on a clean test database.
- [ ] No known critical dependency vulnerabilities remain unreviewed.
- [ ] Demo uses synthetic data and is clearly labelled.