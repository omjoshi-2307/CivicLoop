# Contributing to CivicLoop

CivicLoop — Complaints That Don't Disappear

## 1. Source of truth
Before coding, read README.md and the documents in docs/. Requirements define MVP scope; Architecture defines system boundaries; API_CONTRACT defines frontend/backend expectations; DECISIONS records approved choices.

Do not treat proposed features as implemented. Do not change scope, stack, data contracts or security rules without discussing them with the project lead.

## 2. Team responsibilities

### Project lead (Om) with the backend/architecture track
- Owns final technical decisions and integration.
- Coordinates architecture, database design, backend foundation, authentication, authorization, complaint APIs and integration.
- Reviews API and schema changes before the frontend depends on them.
- Approves pull requests before they are merged.

### Swapnil — beginner-friendly frontend track
- Works independently on clearly scoped frontend tasks with support from his own coding assistant.
- Starts with learning the existing React, TypeScript, Vite and styling setup.
- Builds small UI components and pages using approved requirements and API contracts.
- Uses mock data only when clearly labelled and documented.
- Does not independently change backend routes, database schema, authentication security, or shared API contracts.
- Requests review before introducing dependencies or changing shared files.

Swapnil is new to the stack. Tasks should be small, demonstrable and reviewed before moving to the next stage. Do not assign the entire frontend at once.

### Shared responsibilities
- Agree on API request/response shapes before integration.
- Review UI flows and accessibility.
- Test complete citizen and authority workflows.
- Prepare the demo using clearly labelled test data.

## 3. Git workflow
1. Keep main stable.
2. Create a focused branch from the latest main, for example feature/citizen-login-ui or feature/complaint-api.
3. Keep each branch limited to one logical task.
4. Commit meaningful changes with clear messages.
5. Push the branch and open a pull request.
6. Explain what changed and how it was tested.
7. Wait for project-lead review and approval before merging.
8. Do not force-push shared branches or commit secrets.

Suggested branch prefixes: feature/, fix/, docs/, test/, chore/.

## 4. Coding rules
- Follow the existing project conventions; do not create competing patterns.
- Prefer readable, small modules over giant files.
- Use TypeScript types for API and domain data.
- Validate untrusted input on the backend.
- Enforce authentication, role and ownership checks on the backend.
- Never expose private citizen details through public endpoints.
- Keep secrets in local environment variables; commit placeholders only.
- Do not add packages without explaining the need and getting approval.
- Update relevant documentation when behaviour or contracts change.

## 5. Pull request checklist
- [ ] The change addresses one clear task.
- [ ] No unrelated files or generated build output were added.
- [ ] No secrets or real personal data are included.
- [ ] Relevant tests, type checks or manual verification were completed.
- [ ] API and documentation changes are described.
- [ ] Screenshots are attached for meaningful UI changes.
- [ ] Known limitations and follow-up tasks are stated.

## 6. Collaboration boundaries
Do not edit the same files concurrently. Coordinate shared-file changes first. If a requirement is unclear, pause and ask rather than guessing. A separate GPT or coding agent does not automatically know this repository's decisions; provide it with the relevant project documents.

## 7. Access
Contributors need appropriate repository access to push branches. If direct collaboration access is not granted, work in a fork and submit a pull request. Never share account credentials.