import { FastifyInstance } from 'fastify'
import { findAll } from './findAll'
import { findById } from './findById'
import { create } from './create'

export async function disciplinasRoutes(app: FastifyInstance) {
    app.get('/disciplinas', findAll)
    app.get('/disciplinas/:id', findById)
    app.post('/disciplinas', create)
}