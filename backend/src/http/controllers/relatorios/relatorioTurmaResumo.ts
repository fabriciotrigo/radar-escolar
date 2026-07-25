import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RelatoriosRepository } from "../../../repositories/relatorios.repository"
import { RelatorioTurmaResumoUseCase } from "../../../use-cases/relatorios/relatorioResumo-turmas";

export async function relatorioTurmaResumo(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        professor_turma_id: z.coerce.number()
    })

    const { professor_turma_id } = registerParamsSchema.parse(request.params)

    const turmaResumoRepository = new RelatoriosRepository()

    const turmaResumoUseCase = new RelatorioTurmaResumoUseCase(turmaResumoRepository)

    const resumo = await turmaResumoUseCase.handler(professor_turma_id)

    return reply.status(200).send(resumo)
}