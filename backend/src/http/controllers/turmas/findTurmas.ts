import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { TurmasRepository } from "../../../repositories/turmas.repository";
import { FindTurmasUseCase } from "../../../use-cases/turmas/find-turmas";
import { nivelSchema } from "../../../types/nivel_turmas"

export async function findTurmas(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const querySchema = z.object({
        ano: z.coerce.number().optional(),
        sala: z.string().optional(),
        nivel: nivelSchema.optional(),
        ano_letivo: z.coerce.number().optional(),
    });

    const filtros = querySchema.parse(request.query);

    const repository =
        new TurmasRepository();

    const useCase =
        new FindTurmasUseCase(
            repository
        );

    const turmas =
        await useCase.handler(
            filtros
        );

    return reply.status(200).send(
        turmas
    );

}