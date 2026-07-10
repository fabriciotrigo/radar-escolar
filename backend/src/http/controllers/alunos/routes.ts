import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function alunosRoutes(app: FastifyInstance) {
    app.post('/alunos', create)
}