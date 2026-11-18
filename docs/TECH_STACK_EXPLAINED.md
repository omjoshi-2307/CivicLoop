# CivicLoop — Technology Stack Explained

**Audience:** All CivicLoop contributors, including Swapnil  
**Project:** CivicLoop — *Complaints That Don't Disappear*  
**Purpose:** Explain what each selected technology does, why the project uses it, and how the pieces work together.

This document is an accessible companion to the project overview, requirements and architecture documents. It is intended to help contributors understand the decisions rather than simply copy commands or generate code.

---

## 1. The big picture: how a web application works

CivicLoop has three main technical layers:

1. **Frontend:** The screens that citizens, authorities and administrators see and use.
2. **Backend:** The server-side application that receives requests, checks permissions, applies project rules and coordinates data operations.
3. **Database and file storage:** The systems that retain structured records and uploaded evidence.

For example, when a citizen submits a road-damage complaint:

1. The frontend displays a complaint form and collects the citizen's input.
2. The frontend sends the information to the backend through an HTTP API.
3. The backend checks the user's session, permissions and submitted data.
4. The backend uses the database layer to save the complaint and related records.
5. The backend returns the result, including the complaint's tracking identifier.
6. The frontend displays the confirmation and tracking information.

The browser must not be trusted to enforce permissions or protect private information. Those checks belong on the backend.

---

## 2. Frontend technologies

The frontend is the user-facing part of CivicLoop. It will contain the citizen experience, authority dashboard and administrator interface.

### React — building the user interface

**What it is:** A JavaScript library for building user interfaces.

**What it does in CivicLoop:** React lets us divide screens into reusable components, such as navigation bars, complaint cards, status badges, forms, tables and dashboard sections.

**Why we selected it:**
- Reusable components reduce duplicated interface code.
- It supports interactive pages that update as application data changes.
- It has a large ecosystem and works well with TypeScript.
- It is suitable for a multi-role web application.

React builds the interface; it does not replace the backend or database.

Official documentation: https://react.dev/

### TypeScript — safer application code

**What it is:** JavaScript with a static type system.

**What it does in CivicLoop:** TypeScript describes the shape of important data, such as a complaint, user, notification or API response. It helps detect many coding mistakes while developing.

Example:

```ts
type Complaint = {
  id: string;
  title: string;
  status: string;
  wardId: string;
};
```

If code refers to a misspelled property such as `complaint.titel`, TypeScript can flag it.

**Why we selected it:**
- Makes data structures clearer.
- Helps catch mistakes before the application runs.
- Improves editor assistance and refactoring.
- Helps contributors coordinate frontend and backend data contracts.

TypeScript does not validate untrusted HTTP input at runtime by itself. The backend still needs runtime validation.

Official documentation: https://www.typescriptlang.org/

### Vite — frontend development and build tool

**What it is:** A frontend development server and build tool.

**What it does in CivicLoop:** Vite runs the frontend during development and produces the optimized assets used for deployment. It also provides fast updates while developers edit files.

Typical development command:

```bash
npm run dev
```

**Why we selected it:**
- Quick development startup.
- Fast feedback while editing.
- Straightforward React and TypeScript setup.

Vite does not replace React; it provides the tooling around the frontend project.

Official documentation: https://vite.dev/

### Tailwind CSS — styling

**What it is:** A utility-first CSS framework.

**What it does in CivicLoop:** Tailwind provides styling utilities for layout, spacing, typography, colours, responsive behaviour and states.

Example:

```tsx
<button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
  Submit complaint
</button>
```

**Why we selected it:**
- Helps build consistent layouts quickly.
- Makes responsive styling practical.
- Keeps many styling decisions close to the component using them.

Tailwind controls presentation; it does not provide application behaviour or data storage.

Official documentation: https://tailwindcss.com/

### shadcn/ui — customizable interface components

**What it is:** A collection of reusable interface components and patterns.

**What it does in CivicLoop:** It can provide starting components for dialogs, dropdowns, buttons, forms, tables and alerts.

**Why we selected it:**
- Reduces the time needed to build common interface elements.
- Components can be customized in our own codebase.
- It supports accessible interaction patterns when implemented correctly.

Important: shadcn/ui is not a conventional component package that owns all the UI code. Its components are added to the project source and can be modified.

Official documentation: https://ui.shadcn.com/

---

## 3. Backend technologies

The backend is responsible for application rules, data access and security checks. It must not rely on the frontend to protect restricted operations.

### Node.js — server-side JavaScript runtime

**What it is:** A runtime that executes JavaScript outside the browser.

**What it does in CivicLoop:** Node.js runs our backend application and its server-side code.

**Why we selected it:**
- Allows us to use TypeScript/JavaScript across the frontend and backend.
- Has a mature ecosystem for web applications.
- Works with Fastify, Prisma and our selected tooling.

Official website: https://nodejs.org/

### Fastify — backend web framework

**What it is:** A web framework for Node.js.

**What it does in CivicLoop:** Fastify receives HTTP requests and routes them to the correct application modules. It also provides a plugin system, hooks, request lifecycle features and response handling.

Example API route:

```ts
fastify.post("/api/v1/complaints", async (request, reply) => {
  // Validate, authorize and process the complaint.
  // The actual implementation will call the complaint service.
});
```

**Why we selected it:**
- Its plugin architecture supports a modular backend.
- It provides useful request lifecycle and schema features.
- It is lightweight and suitable for a modular monolith.
- The project lead already has some familiarity with Fastify.

Express is also a capable framework. Fastify is our project choice because its structure and the team's existing familiarity suit this implementation.

Official documentation: https://fastify.dev/

### Zod — runtime data validation

**What it is:** A TypeScript-first schema validation library.

**What it does in CivicLoop:** It can check incoming data against defined rules, such as requiring a non-empty complaint title or a valid category identifier.

Example:

```ts
import { z } from "zod";

const complaintInput = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  categoryId: z.string().min(1),
});
```

**Why we selected it:**
- Makes validation rules explicit.
- Produces useful validation errors.
- Can infer TypeScript types from schemas.
- Helps keep input validation consistent.

Fastify also supports JSON Schema-based validation. We should choose a clear validation approach for each route and avoid maintaining duplicate, conflicting rules. Zod should be used where it adds value, not added mechanically to every layer.

Official documentation: https://zod.dev/

---

## 4. Database technologies

CivicLoop stores related information: users, complaints, wards, status history, duplicate groups, evidence metadata, notifications and feedback.

### PostgreSQL — relational database

**What it is:** An open-source relational database management system.

**What it does in CivicLoop:** PostgreSQL stores structured application records and the relationships between them.

Illustrative example:

**Users**

| ID | Name |
|---|---|
| user-1 | Asha |
| user-2 | Ravi |

**Complaints**

| ID | Title | Citizen ID |
|---|---|---|
| complaint-101 | Road damage | user-1 |
| complaint-102 | Water leakage | user-1 |

The citizen ID connects each complaint to its owner. Similar relationships connect complaints to their status history, ward, evidence and duplicate group.

**Why we selected it:**
- CivicLoop has many related entities.
- Foreign keys and constraints help protect data integrity.
- Transactions help keep related database changes consistent.
- SQL supports structured reporting and ward-level analytics.

MongoDB is useful for document-oriented workloads, but PostgreSQL is a natural fit for CivicLoop's relational records and reporting needs.

Official website: https://www.postgresql.org/

### Prisma — database ORM and schema tooling

**What it is:** An object-relational mapper (ORM) and database development toolkit for TypeScript/JavaScript.

**What it does in CivicLoop:** Prisma provides a typed way for backend code to query and update PostgreSQL. Its schema describes database models, and its migration tooling helps track database structure changes.

Illustrative query:

```ts
const complaints = await prisma.complaint.findMany({
  where: { status: "IN_PROGRESS" },
});
```

**Why we selected it:**
- Typed database queries.
- A central schema describing models and relationships.
- Versioned migrations for controlled database changes.
- Convenient access to related records.

Prisma does not replace PostgreSQL. PostgreSQL stores the data; Prisma helps our application communicate with it.

Official documentation: https://www.prisma.io/docs

---

## 5. Authentication and security technologies

CivicLoop has citizen, authority and administrator roles. The backend must verify both identity and permission for protected operations.

### Argon2id — password hashing

**What it is:** A password-hashing algorithm.

**What it does in CivicLoop:** The backend hashes passwords before storing them. During login, it verifies the submitted password against the stored hash.

Passwords must never be stored as plain text. Password hashing is different from reversible encryption: the application verifies a password without storing the original password.

**Why we selected it:** Argon2id is a modern password-hashing option designed to make large-scale password guessing more expensive.

Implementation must use a maintained library and appropriately configured parameters.

Reference: https://github.com/P-H-C/phc-winner-argon2

### Cookie-based sessions — maintaining login state

**What it is:** A server-managed authentication session associated with a browser cookie.

**What it does in CivicLoop:** After successful login, the backend creates a session. The browser sends the session cookie with subsequent requests, allowing the backend to identify the authenticated user.

Planned safeguards:
- HTTP-only cookies.
- Secure cookies in production.
- Appropriate SameSite configuration.
- Session expiration and logout invalidation.
- CSRF protection where applicable.
- Server-side session validation.

**Why we selected sessions instead of starting with JWT:** CivicLoop is a browser-based application. Server-managed sessions provide a straightforward way to revoke and manage login state.

The session cookie is not a substitute for authorization. The backend must still check the user's role and access to the requested resource.

### RBAC — Role-Based Access Control

**What it is:** A method of granting permissions based on a user's role.

**What it does in CivicLoop:** It separates citizen, authority and administrator capabilities.

Illustrative permissions:

| Action | Citizen | Authority | Admin |
|---|---|---|---|
| Submit a complaint | Yes | No | As authorized |
| View own complaints | Yes | No | As authorized |
| Update assigned complaint status | No | Yes | As authorized |
| Manage authority accounts | No | No | Yes |
| View platform-wide analytics | Limited | No | Yes |

The final permissions must follow the requirements document. The backend enforces these permissions on every protected operation. Hiding a button in the frontend is not security.

---

## 6. Analytics and testing

### Recharts — data visualization

**What it is:** A charting library for React.

**What it does in CivicLoop:** It can display ward-level complaint counts, status distributions, category summaries and trends.

**Why we selected it:** It integrates with React and provides common chart types for dashboard analytics.

Charts must use real API data when integrated. Placeholder values used during UI development must be clearly identified as sample data.

Official documentation: https://recharts.org/

### Vitest — automated tests

**What it is:** A test framework designed for modern JavaScript and TypeScript projects.

**What it does in CivicLoop:** It tests application logic and modules, such as validation, duplicate matching, permission helpers and deadline calculations.

**Why we selected it:** It integrates well with Vite and supports TypeScript-oriented projects.

Official documentation: https://vitest.dev/

### Supertest — HTTP API testing

**What it is:** A library for testing Node.js HTTP servers.

**What it does in CivicLoop:** It allows automated tests to send requests to backend routes and verify status codes and response bodies.

Example test scenarios:
- A valid complaint request succeeds for an authorized citizen.
- An invalid complaint request is rejected.
- A citizen cannot update an authority-only status.
- A user cannot retrieve another citizen's private complaint.

**Why we selected it:** API behaviour and authorization need to be tested through HTTP requests, not only by testing individual functions.

Official documentation: https://github.com/ladjs/supertest

---

## 7. How the technologies work together

Example: a citizen submits a complaint.

1. **React** displays the complaint form.
2. **TypeScript** helps the frontend work with the expected data structure.
3. **Vite** runs the frontend during development and builds it for deployment.
4. The frontend sends an HTTP request to the backend.
5. **Node.js** runs the server and **Fastify** handles the API route.
6. The backend checks the user's session and **RBAC** permissions.
7. Runtime validation checks the submitted data.
8. The complaint service uses **Prisma** to create the required records.
9. **PostgreSQL** stores the complaint and related information.
10. Fastify returns the result, and **React** displays the tracking information.

For analytics, the backend will calculate or retrieve authorized aggregates from PostgreSQL, and React components can display those results using Recharts.

For evidence, the actual file will be stored in file storage while PostgreSQL stores metadata and ownership/visibility information. Evidence is private by default and must be explicitly approved before public visibility.

---

## 8. Why this stack fits CivicLoop

| Project need | Selected technology |
|---|---|
| Interactive user interfaces | React |
| Type safety | TypeScript |
| Frontend development and build | Vite |
| Styling | Tailwind CSS |
| Reusable UI components | shadcn/ui |
| Server-side runtime | Node.js |
| HTTP APIs | Fastify |
| Runtime input validation | Zod, where appropriate |
| Relational data storage | PostgreSQL |
| Typed database access and migrations | Prisma |
| Password hashing | Argon2id |
| Browser login sessions | Secure cookie-based sessions |
| Role and ownership enforcement | Backend RBAC |
| Dashboard charts | Recharts |
| Logic tests | Vitest |
| HTTP API tests | Supertest |

The goal is not to use as many tools as possible. Each selected technology has a specific responsibility. We should not add a dependency unless it solves a real project need.

---

## 9. Architecture decisions and boundaries

### Approved MVP baseline

- Modular monolith: one backend application organized into separate modules.
- React + TypeScript + Vite frontend.
- Tailwind CSS and shadcn/ui for the interface.
- Node.js + Fastify + TypeScript backend.
- PostgreSQL database with Prisma.
- REST API routes under `/api/v1/`.
- Secure cookie-based sessions and backend-enforced RBAC.
- Local development first.

### Intentionally undecided

- Hosting provider and deployment topology.
- Production file-storage provider.
- Production domain and deployment configuration.

These decisions will be made when the local application and its requirements are sufficiently clear. Code should use environment-based configuration and avoid unnecessary provider-specific dependencies.

### Important scope boundaries

- Do not introduce microservices for this MVP.
- Do not add Redis, Kafka or a separate job-processing platform without a demonstrated need.
- Do not invent API endpoints or data contracts independently.
- Do not expose private citizen information in public responses.
- Do not treat sample data as real municipal data.
- Do not claim that CivicLoop is integrated with a government system.
- Do not change the approved architecture without discussing it with the project lead.

---

## 10. Recommended learning order for contributors

A contributor who is new to this stack can learn it in this order:

1. HTML, CSS and JavaScript fundamentals.
2. React components, props, state and forms.
3. TypeScript basics and interfaces/types.
4. Vite project structure and npm scripts.
5. Tailwind CSS and the project's UI components.
6. HTTP requests and REST API concepts.
7. Basic backend concepts and Fastify routes.
8. PostgreSQL tables, primary keys and foreign keys.
9. Prisma models, queries and migrations.
10. Authentication, sessions, RBAC and testing.

Contributors do not need to master every technology before helping. Swapnil's initial responsibility is frontend development, so React, TypeScript, Vite, Tailwind and the agreed API contract are his first priorities.

---

## 11. Project reference documents

Read these documents alongside this explanation:

- [Project Overview](PROJECT_OVERVIEW.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture](ARCHITECTURE.md)

**Remember:** Understand the responsibility of a technology before using it. Build CivicLoop incrementally, verify each stage, and ask before changing shared architecture or API contracts.
