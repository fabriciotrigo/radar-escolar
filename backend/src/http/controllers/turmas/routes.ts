import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findTurmas } from './findTurmas'

export async function turmasRoutes(app: FastifyInstance) {
    app.post('/turmas', create)
    app.get('/turmas', findTurmas)
}