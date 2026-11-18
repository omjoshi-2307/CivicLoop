# CivicLoop — Backend

The API server for CivicLoop, built with **Node.js**, **TypeScript**, and **Fastify**.

## Scripts

Run commands from this directory:

- `npm run dev` — Starts development server with hot-reload on `http://127.0.0.1:3000`
- `npm run build` — Compiles TypeScript to `dist/`
- `npm run start` — Runs the compiled server from `dist/index.js`
- `npm run typecheck` — Typechecks TypeScript source without emitting files

## Health Check Endpoint

```bash
curl http://127.0.0.1:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-11-18T...",
  "uptime": 1.23
}
```

## Environment Variables

Copy `.env.example` to `.env` for local configuration:

```bash
cp .env.example .env
```

Default variables:
- `PORT` — Listening port (default: `3000`)
- `HOST` — Bind host address (default: `127.0.0.1`)
- `NODE_ENV` — Environment name (`development`, `production`, `test`)
