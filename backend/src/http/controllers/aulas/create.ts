import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { AulasRepository } from "../../../repositories/aulas.repository"
import { ProfessorTurmaRepository } from "../../../repositories/professor_turma.repository"
import { AlunoTurmaRepository } from "../../../repositories/aluno_turma.repository"
import { AlunoAulaRepository } from "../../../repositories/aluno_aula.repository"

import { createAulasUseCase } from "../../../use-cases/aulas/create-aulas"

export async function create(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const registerBodySchema = z.object({
        professor_turma_id: z.number(),
        data: z.coerce.date(),
        assunto: z.string()
    })

    const { professor_turma_id, data, assunto } =
        registerBodySchema.parse(request.body)

    const aulasRepository = new AulasRepository()
    const professorTurmaRepository = new ProfessorTurmaRepository()
    const alunoTurmaRepository = new AlunoTurmaRepository()
    const alunoAulaRepository = new AlunoAulaRepository()

    const createAulas = new createAulasUseCase(
        aulasRepository,
        professorTurmaRepository,
        alunoTurmaRepository,
        alunoAulaRepository
    )

    const aula = await createAulas.handler({
        professor_turma_id,
        data,
        assunto
    })

    return reply.status(201).send(aula)
}