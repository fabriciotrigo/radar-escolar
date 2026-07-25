import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RelatoriosRepository } from "../../../repositories/relatorios.repository"
import { RelatorioTurmasParticipacaoUseCase } from "../../../use-cases/relatorios/relatorioParticipacao-turmas";

export async function relatorioTurmasParticipacao(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        professor_turma_id: z.coerce.number()
    })

    const { professor_turma_id } = registerParamsSchema.parse(request.params)

    const turmasParticipacaoRepository = new RelatoriosRepository()

    const turmasParticipacaoUseCase = new RelatorioTurmasParticipacaoUseCase(turmasParticipacaoRepository)

    const participacao = await turmasParticipacaoUseCase.handler(professor_turma_id)

    return reply.status(200).send(participacao)
}