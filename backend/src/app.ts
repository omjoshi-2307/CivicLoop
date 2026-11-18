import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import { healthRoutes } from './routes/health.js'

export function buildApp(opts: FastifyServerOptions = {}): FastifyInstance {
  const app = Fastify(opts)

  // Register health route
  void app.register(healthRoutes)

  return app
}
