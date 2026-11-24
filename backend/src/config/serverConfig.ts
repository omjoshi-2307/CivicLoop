const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const

type LogLevel = (typeof LOG_LEVELS)[number]

export interface ServerConfig {
  port: number
  host: string
  logLevel: LogLevel
}

const DEFAULT_PORT = 3000
const DEFAULT_HOST = '127.0.0.1'

export function readServerConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  const rawPort = env.PORT?.trim()
  let port = DEFAULT_PORT

  if (rawPort) {
    if (!/^\d+$/.test(rawPort)) {
      throw new Error('PORT must be an integer between 1 and 65535.')
    }

    const parsedPort = Number(rawPort)
    if (!Number.isSafeInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
      throw new Error('PORT must be an integer between 1 and 65535.')
    }
    port = parsedPort
  }

  const host = env.HOST?.trim() || DEFAULT_HOST
  const requestedLogLevel = (env.LOG_LEVEL?.trim() || 'info').toLowerCase()
  if (!LOG_LEVELS.includes(requestedLogLevel as LogLevel)) {
    throw new Error(`LOG_LEVEL must be one of: ${LOG_LEVELS.join(', ')}.`)
  }

  return { port, host, logLevel: requestedLogLevel as LogLevel }
}
