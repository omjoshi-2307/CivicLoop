import { buildApp } from './app.js'
import { readServerConfig } from './config/serverConfig.js'

const config = readServerConfig()

const server = buildApp({
  logger: {
    level: config.logLevel,
  },
})

async function start() {
  try {
    await server.listen({ port: config.port, host: config.host })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']
for (const signal of signals) {
  process.on(signal, async () => {
    server.log.info(`Received ${signal}, closing server...`)
    try {
      await server.close()
      process.exit(0)
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  })
}

void start()
