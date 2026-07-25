import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RelatoriosRepository } from "../../../repositories/relatorios.repository"
import { RelatorioTurmasAlunosUseCase } from "../../../use-cases/relatorios/relatorioAlunos-turmas";

export async function relatorioTurmasAlunos(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        professor_turma_id: z.coerce.number()
    })

    const { professor_turma_id } = registerParamsSchema.parse(request.params)

    const turmasAlunosRepository = new RelatoriosRepository()

    const turmasAlunosUseCase = new RelatorioTurmasAlunosUseCase(turmasAlunosRepository)

    const alunos = await turmasAlunosUseCase.handler(professor_turma_id)

    return reply.status(200).send(alunos)
}