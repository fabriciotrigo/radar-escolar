import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { AlunoTurmaRepository } from "../../../repositories/aluno_turma.repository"
import { FindAlunosIDByTurmaUseCase } from "../../../use-cases/aluno_turma/findAlunosIDByTurma"

export async function findAlunosIDByTurma(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const paramsSchema = z.object({
        turma_id: z.coerce.number()
    })

    const { turma_id } = paramsSchema.parse(request.params)

    const alunoTurmaRepository = new AlunoTurmaRepository()

    const findAlunosIDByTurmaUseCase =
        new FindAlunosIDByTurmaUseCase(
            alunoTurmaRepository
        )

    const alunosID =
        await findAlunosIDByTurmaUseCase.handler(
            turma_id
        )

    return reply.status(200).send(alunosID)

}