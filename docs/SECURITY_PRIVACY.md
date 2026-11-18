# CivicLoop — Security and Privacy

Status: mandatory design baseline for the MVP. Implementation and review are still required.

## 1. Security principles
- Least privilege: users receive only the access needed for their role and scope.
- Deny by default for protected operations.
- Enforce security on the backend; frontend controls are presentation only.
- Minimize collection and exposure of personal information.
- Keep an auditable record of important authority actions.
- Never use real citizen data in demos or test fixtures without explicit authorization and safeguards.

## 2. Authentication
- Hash passwords with a maintained Argon2id implementation and reviewed parameters.
- Never store plaintext passwords or log credentials.
- Use server-managed sessions with a persistent store selected and tested before deployment.
- Configure HTTP-only, Secure-in-production and appropriate SameSite cookie attributes.
- Expire and invalidate sessions on logout and relevant account-security events.
- Apply rate limits to login and registration endpoints.

## 3. Authorization
- Enforce role-based permissions for citizen, authority and administrator.
- Check complaint ownership on every private citizen operation.
- Check authority ward/assignment scope on every authority operation.
- Provision authority accounts through administrators.
- Test horizontal access control: one citizen must not access another citizen's private complaint.
- Never trust role, owner ID or scope supplied by the browser.

## 4. Public data protection
Public endpoints must construct explicit allowlisted response objects. Never return full user or complaint database records. Exclude citizen names, contact details, credentials, session identifiers, exact residential addresses, private notes and unapproved evidence.

## 5. File upload safeguards
- Allow only explicitly supported file types and size limits.
- Validate file signatures/content where feasible; do not trust filename extensions or browser MIME headers alone.
- Generate storage names rather than using raw user filenames as paths.
- Store uploads outside executable/public web roots or in private object storage.
- Scan files where a suitable scanning service is available.
- Keep evidence private until an authorized approval action.
- Prevent path traversal and unauthorized direct file access.

## 6. Application and operational security
- Validate all untrusted input.
- Use parameterized database access through the ORM.
- Configure security headers and restrictive CORS only when required.
- Protect cookie-authenticated state-changing requests against CSRF.
- Avoid leaking stack traces, SQL details or secrets in error responses.
- Keep dependencies updated through reviewed changes.
- Use HTTPS in production.
- Keep secrets in environment/secret management, never Git.

## 7. Privacy and demo data
- Collect only information necessary for complaint processing.
- Use synthetic names, locations and complaint records in demos.
- Do not imply that sample records are real government complaints.
- Clearly label public demo data as illustrative.
- Define data retention, deletion and access policies before real-world deployment.

## 8. Security test checklist
- [ ] Unauthenticated requests cannot access protected routes.
- [ ] Citizens cannot read or modify another citizen's private complaint.
- [ ] Authorities cannot act outside their assigned scope.
- [ ] Admin-only operations reject other roles.
- [ ] Public responses contain only approved fields.
- [ ] Unapproved evidence is inaccessible publicly.
- [ ] Invalid or oversized uploads are rejected.
- [ ] Login rate limiting and session invalidation work.
- [ ] Secrets and personal data do not appear in logs or repository history.

This document is a development baseline, not a security certification or legal privacy assessment.