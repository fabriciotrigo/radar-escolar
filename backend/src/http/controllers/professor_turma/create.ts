import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { ProfessorTurmaRepository } from "../../../repositories/professor_turma.repository"
import { createProfessorTurmaUseCase } from "../../../use-cases/professor_turma/create-professor_turma"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        professor_id: z.number(),
        turma_id: z.number(),
        disciplina_id: z.number()
    })

    const { professor_id, turma_id, disciplina_id } = registerBodySchema.parse(request.body)

    const professorTurmaRepository = new ProfessorTurmaRepository()
    const createProfessorTurma = new createProfessorTurmaUseCase(professorTurmaRepository)

    const professor_turma = await createProfessorTurma.handler({ professor_id, turma_id, disciplina_id })

    return reply.status(201).send(professor_turma)

}