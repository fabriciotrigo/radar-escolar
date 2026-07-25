import { FastifyInstance } from 'fastify'
import { relatorioTurmasDashboard } from './relatorioTurmas'
import { relatorioTurmasNotas } from './relatorioTurmasNotas'
import { relatorioTurmasParticipacao } from './relatorioTurmasParticipacao'
import { relatorioTurmasAlunos } from './relatorioTurmasAlunos'
import { relatorioTurmaResumo } from './relatorioTurmaResumo'

export async function relatoriosRoutes(app: FastifyInstance) {
    app.get('/relatorios/turmas', relatorioTurmasDashboard)
    app.get('/relatorios/turmas/:professor_turma_id', relatorioTurmaResumo)
    app.get('/relatorios/turmas/:professor_turma_id/notas', relatorioTurmasNotas)
    app.get('/relatorios/turmas/:professor_turma_id/participacao', relatorioTurmasParticipacao)
    app.get('/relatorios/turmas/:professor_turma_id/alunos', relatorioTurmasAlunos)
}