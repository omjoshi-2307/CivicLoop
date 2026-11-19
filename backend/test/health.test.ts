import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildApp } from '../src/app.js'

test('GET /health returns liveness metadata without opening a server socket', async () => {
  const app = buildApp({ logger: false })

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    })

    assert.equal(response.statusCode, 200)
    assert.match(response.headers['content-type'] ?? '', /application\/json/)

    const payload = response.json() as {
      status?: unknown
      timestamp?: unknown
      uptime?: unknown
    }

    assert.equal(payload.status, 'ok')
    assert.equal(typeof payload.timestamp, 'string')
    assert.ok(Number.isFinite(Date.parse(payload.timestamp as string)))
    assert.equal(typeof payload.uptime, 'number')
    assert.ok((payload.uptime as number) >= 0)
  } finally {
    await app.close()
  }
})
