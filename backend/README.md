# CivicLoop — Backend

The API server for CivicLoop, built with **Node.js**, **TypeScript**, and **Fastify**.

## Scripts

Run commands from this directory:

- `npm run dev` — Starts the development server with Node's watch mode and TypeScript support on `http://127.0.0.1:3000`
- `npm run build` — Compiles TypeScript to `dist/`
- `npm run start` — Runs the compiled server from `dist/index.js`
- `npm run typecheck` — Typechecks TypeScript source without emitting files
- `npm test` — Runs the backend's Node.js test suite using Fastify's in-process injection API

Both `npm run dev` and `npm run start` load this directory's `.env` file through Node's built-in `--env-file-if-exists` option. Variables already present in the process environment take precedence over values in `.env`. The repository's documented Node.js 26 baseline supports this option.

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

Do not commit the real `.env` file; keep local values and credentials out of Git.
