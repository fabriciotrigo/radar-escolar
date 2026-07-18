import { FastifyReply, FastifyRequest } from "fastify"
import { LoadAulasUseCase } from "../../../use-cases/aulas/loadAulas-aulas";
import { AulasRepository } from "../../../repositories/aulas.repository";

export async function loadAulas(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const { id } = request.params as {
        id: string
    };

    const { page = "1", limit = "10" } = request.query as {
        page?: string;
        limit?: string;
    };

    const useCase = new LoadAulasUseCase(
        new AulasRepository()
    );

    const aulas = await useCase.execute({
        professorTurmaId: Number(id),
        page: Number(page),
        limit: Number(limit)
    });

    return reply.status(200).send(aulas);

}