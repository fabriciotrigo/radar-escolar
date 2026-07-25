import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RelatoriosRepository } from "../../../repositories/relatorios.repository"
import { RelatorioTurmasNotasUseCase } from "../../../use-cases/relatorios/relatorioNotas-turmas";

export async function relatorioTurmasNotas(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        professor_turma_id: z.coerce.number()
    })

    const { professor_turma_id } = registerParamsSchema.parse(request.params)

    const turmasNotasRepository = new RelatoriosRepository()

    const turmasNotasUseCase = new RelatorioTurmasNotasUseCase(turmasNotasRepository)

    const notas = await turmasNotasUseCase.handler(professor_turma_id)

    return reply.status(200).send(notas)
}