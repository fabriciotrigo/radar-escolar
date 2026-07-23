import { FastifyInstance } from 'fastify'
import { relatorioTurmasDashboard } from './relatorioTurmas'

export async function relatoriosRoutes(app: FastifyInstance) {
    app.get('/relatorios/turmas', relatorioTurmasDashboard)
}