import assert from 'node:assert/strict'
import { test } from 'node:test'

import { readServerConfig } from '../src/config/serverConfig.js'

const configFrom = (values: Record<string, string>) =>
  readServerConfig(values as NodeJS.ProcessEnv)

test('uses safe local defaults when optional values are absent or blank', () => {
  assert.deepEqual(readServerConfig({} as NodeJS.ProcessEnv), {
    port: 3000,
    host: '127.0.0.1',
    logLevel: 'info',
  })
  assert.deepEqual(configFrom({ PORT: ' ', HOST: ' ', LOG_LEVEL: ' ' }), {
    port: 3000,
    host: '127.0.0.1',
    logLevel: 'info',
  })
})

test('accepts valid port boundaries, host values, and case-insensitive log levels', () => {
  assert.deepEqual(configFrom({ PORT: '1', HOST: '0.0.0.0', LOG_LEVEL: 'DEBUG' }), {
    port: 1,
    host: '0.0.0.0',
    logLevel: 'debug',
  })
  assert.equal(configFrom({ PORT: '65535' }).port, 65535)
})

test('rejects malformed and out-of-range ports instead of silently falling back', () => {
  for (const PORT of ['0', '65536', '-1', '1.5', '1e3', 'NaN', 'Infinity', 'abc']) {
    assert.throws(() => configFrom({ PORT }), /PORT must be an integer between 1 and 65535/)
  }
})

test('rejects unsupported Fastify log levels', () => {
  assert.throws(() => configFrom({ LOG_LEVEL: 'verbose' }), /LOG_LEVEL must be one of/)
})
