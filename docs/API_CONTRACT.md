# CivicLoop — API Contract

Status: initial interface agreement. Endpoint names and payload details below are proposed contract areas, not implemented routes. Final schemas must be reviewed and versioned before frontend integration.

## 1. API principles
- Base path: /api/v1.
- REST-style HTTP resources.
- JSON for ordinary requests and responses; multipart form data for evidence uploads.
- Backend is authoritative for validation, authentication, authorization and privacy.
- Use consistent error responses and appropriate HTTP status codes.
- Public responses must use explicit allowlisted fields.
- Never expose database models directly as API responses.

## 2. Authentication
| Method | Proposed path | Purpose | Access |
|---|---|---|---|
| POST | /auth/register | Citizen registration | Public |
| POST | /auth/login | Create authenticated session | Public |
| POST | /auth/logout | End current session | Authenticated |
| GET | /auth/me | Return current user's safe profile and role | Authenticated |

Authority accounts are provisioned by administrators; public authority self-registration is not part of the MVP.

## 3. Complaints
| Method | Proposed path | Purpose | Access |
|---|---|---|---|
| POST | /complaints | Create complaint | Citizen |
| GET | /complaints/mine | List current citizen's complaints | Citizen |
| GET | /complaints/{complaintId} | Read permitted complaint details | Owner or authorized authority/admin |
| GET | /public/complaints | List sanitized public complaints | Public |
| GET | /public/complaints/{complaintId} | Read sanitized public complaint | Public |

Authority list/filter routes must enforce ward or assigned scope. Do not rely on client-supplied user IDs to establish ownership.

## 4. Authority operations
| Method | Proposed path | Purpose | Access |
|---|---|---|---|
| GET | /authority/complaints | List complaints within authorized scope | Authority |
| PATCH | /authority/complaints/{complaintId}/status | Change status and add timeline event | Authority |
| POST | /authority/complaints/{complaintId}/resolution | Record resolution details | Authority |
| GET | /authority/analytics/wards/{wardId} | Retrieve permitted ward aggregates | Authority with scope |

## 5. Duplicate review
| Method | Proposed path | Purpose | Access |
|---|---|---|---|
| GET | /authority/duplicate-suggestions | List candidate matches | Authority |
| POST | /authority/duplicate-groups | Create verified group | Authorized authority |
| POST | /authority/duplicate-groups/{groupId}/members | Add complaint to group | Authorized authority |
| DELETE | /authority/duplicate-groups/{groupId}/members/{complaintId} | Remove membership if policy permits | Authorized authority |

Grouping must preserve original complaints and tracking IDs. No automatic deletion or merging.

## 6. Evidence, notifications, escalation and feedback
Proposed resource areas include complaint evidence upload and approval, user-specific notifications and read state, administrator escalation actions, and citizen feedback after resolution. Exact paths and schemas must be agreed before implementation.

Evidence is private by default. A public evidence response must only include an approved file reference or safe delivery URL.

## 7. Response conventions
Successful resource creation should return the created resource's public-safe representation and identifier. List responses should have a documented pagination format before implementation. Dates should use ISO 8601 timestamps with timezone information.

Errors should use a consistent shape, for example:

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The submitted data is invalid.",
    "details": []
  }
}

The example is illustrative. The final error schema must be implemented consistently and must not leak stack traces or sensitive details.

## 8. Contract change process
1. Propose the change in this document or a linked issue.
2. Explain why the change is required and which frontend/backend modules it affects.
3. Obtain project-lead approval.
4. Update API types, implementation and tests together.
5. Notify both development tracks before merging.

Do not invent request fields, status names, pagination keys or response envelopes independently.