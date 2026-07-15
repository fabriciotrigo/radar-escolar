import { FastifyInstance } from 'fastify'
import { findAlunosTurma } from './findAlunosTurma'
import { findAlunosIDByTurma } from './findAlunosIDByTurma'
import { create } from './create'

export async function alunosTurmaRoutes(app: FastifyInstance) {
    app.get("/turmas/:turma_id/alunos", findAlunosTurma)
    app.get("/turmas/:turma_id/alunos/id", findAlunosIDByTurma)
    app.post("/turmas/alunos", create)
}