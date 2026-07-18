import { FastifyInstance } from 'fastify'
import { create } from './create'
import { loadAulas } from './loadAulas'

export async function aulasRoutes(app: FastifyInstance) {
    app.post('/aulas', create)
    app.get('/professor-turma/:id/aulas', loadAulas) // :id = professor_turma_id
}