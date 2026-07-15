import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findDashboard } from './findDashboard'

export async function professorTurmaRoutes(app: FastifyInstance) {
    app.post('/professor-turma', create)
    app.get('/professor-turma/dashboard', findDashboard)
}