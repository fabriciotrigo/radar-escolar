import { FastifyReply, FastifyRequest } from "fastify";
import { RelatoriosRepository } from "../../../repositories/relatorios.repository";
import { RelatorioTurmasUseCase } from "../../../use-cases/relatorios/relatorio-turmas";

export async function relatorioTurmasDashboard(request: FastifyRequest, reply: FastifyReply) {

    const user = request.user as {
        id: number
        email: string
        nome: string
        perfil: string
    }

    const professorId = user.id

    const relatorioTurmasRepository = new RelatoriosRepository()

    const relatorioTurmasUseCase = new RelatorioTurmasUseCase(relatorioTurmasRepository)

    const response = await relatorioTurmasUseCase.handler(professorId)

    return reply.status(200).send(response)
}