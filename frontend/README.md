# CivicLoop — Frontend

The web client for CivicLoop, built with **React**, **TypeScript**, and **Vite**.

## Scripts

Run commands from this directory:

- `npm run dev` — Starts local development server on `http://localhost:5173`
- `npm run build` — Typechecks and builds production bundle to `dist/`
- `npm run typecheck` — Typechecks TypeScript source without emitting files
- `npm run preview` — Previews the production build locally
- `npm run lint` — Runs static code linter

## Environment Variables

Copy `.env.example` to `.env` for local configuration:

```bash
cp .env.example .env
```

Default variables:
- `VITE_API_BASE_URL` — Target backend API base URL (default: `http://127.0.0.1:3000/api/v1`)
