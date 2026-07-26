import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RelatoriosAlunoRepository } from "../../../repositories/relatorios_aluno.repository"
import { RelatoriosAlunoUseCase } from "../../../use-cases/relatorios/relatorioHistorico-alunos";

export async function relatoriosAluno(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        professor_turma_id: z.coerce.number(),
        aluno_id: z.coerce.number()
    })

    const { professor_turma_id, aluno_id } = registerParamsSchema.parse(request.params)

    const relatoriosAlunoRepository = new RelatoriosAlunoRepository()

    const relatoriosAlunoUseCase = new RelatoriosAlunoUseCase(relatoriosAlunoRepository)

    const resumo = await relatoriosAlunoUseCase.handler(professor_turma_id, aluno_id)

    return reply.status(200).send(resumo)
}