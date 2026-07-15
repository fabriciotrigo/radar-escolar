import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { AlunoTurmaRepository } from "../../../repositories/aluno_turma.repository"
import { createAlunoTurmaUseCase } from "../../../use-cases/aluno_turma/create-aluno_turma"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        aluno_id: z.number(),
        turma_id: z.number()
    })

    const { aluno_id, turma_id } = registerBodySchema.parse(request.body)

    const alunoTurmaRepository = new AlunoTurmaRepository()
    const createAlunoTurma = new createAlunoTurmaUseCase(alunoTurmaRepository)

    const aluno_turma = await createAlunoTurma.handler({ aluno_id, turma_id })

    return reply.status(201).send(aluno_turma)

}