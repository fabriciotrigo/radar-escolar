import { FastifyInstance } from 'fastify'
import { create } from './create'
import { updateChamada } from './update'

export async function aulasRoutes(app: FastifyInstance) {
    app.post('/aulas', create)
    app.put('/aulas/:id/chamada', updateChamada) // :id = aula_id
}