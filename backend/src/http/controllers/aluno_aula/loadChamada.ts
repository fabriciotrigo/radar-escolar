import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { AlunoAulaRepository } from "../../../repositories/aluno_aula.repository";
import { LoadChamadaUseCase } from "../../../use-cases/aluno_aula/loadChamada-aulas";

export async function loadChamada(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const paramsSchema = z.object({
        id: z.coerce.number()
    });

    const { id: aulaId } = paramsSchema.parse(request.params);

    const alunoAulaRepository = new AlunoAulaRepository();

    const loadChamadaUseCase = new LoadChamadaUseCase(
        alunoAulaRepository
    );

    const chamada = await loadChamadaUseCase.execute(aulaId);

    return reply.status(200).send(chamada);

}