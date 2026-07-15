import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { participacaoSchema } from "../../../types/participacao_aluno_aula"
import { AlunoAula } from "../../../entities/aluno_aula.entity"
import { AlunoAulaRepository } from "../../../repositories/aluno_aula.repository"
import { UpdateChamadaUseCase } from "../../../use-cases/aulas/updateChamada-aulas"

export async function updateChamada(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const paramsSchema = z.object({
        id: z.coerce.number()
    })

    const bodySchema = z.array(
        z.object({
            aluno_id: z.number(),
            presenca: z.boolean(),
            participacao: participacaoSchema,
            nota_atividade: z.number().nullable(),
            observacao: z.string()
        })
    )

    const { id: aula_id } = paramsSchema.parse(request.params)

    const body = bodySchema.parse(request.body)

    const alunosAula: AlunoAula[] = body.map(aluno => ({
        aula_id,
        aluno_id: aluno.aluno_id,
        presenca: aluno.presenca,
        participacao: aluno.participacao,
        nota_atividade: aluno.nota_atividade,
        observacao: aluno.observacao
    }))

    const alunoAulaRepository = new AlunoAulaRepository()

    const updateChamadaUseCase = new UpdateChamadaUseCase(alunoAulaRepository)

    await updateChamadaUseCase.handler(alunosAula)

    return reply.status(204).send()

}