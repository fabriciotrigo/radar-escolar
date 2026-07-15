import { FastifyReply, FastifyRequest } from "fastify";
import { ProfessorTurmaRepository } from "../../../repositories/professor_turma.repository";
import { FindDashboardUseCase } from "../../../use-cases/professor_turma/findDashboard";

export async function findDashboard(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const user = request.user as {
        id: number
        email: string
        nome: string
        perfil: string
    }

    const professorId = user.id
    const anoLetivo = new Date().getFullYear()

    const professorTurmaRepository = new ProfessorTurmaRepository()

    const findDashboardUseCase = new FindDashboardUseCase(professorTurmaRepository)

    const dashboard = await findDashboardUseCase.handler(professorId, anoLetivo)

    return reply.status(200).send(dashboard)
}