import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { AlunoTurmaRepository } from "../../../repositories/aluno_turma.repository"
import { FindAlunosTurmaUseCase } from "../../../use-cases/aluno_turma/findAlunosTurma"

export async function findAlunosTurma(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const paramsSchema = z.object({
        turma_id: z.coerce.number()
    })

    const { turma_id } = paramsSchema.parse(request.params)

    const alunoTurmaRepository = new AlunoTurmaRepository()

    const findAlunosTurmaUseCase = new FindAlunosTurmaUseCase(
        alunoTurmaRepository
    )

    const alunos = await findAlunosTurmaUseCase.handler(turma_id)

    return reply.status(200).send(alunos)

}