import { buildApp } from './app.js'

const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || '127.0.0.1'

const server = buildApp({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
})

async function start() {
  try {
    await server.listen({ port: PORT, host: HOST })
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
