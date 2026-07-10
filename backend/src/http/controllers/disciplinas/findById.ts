import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { DisciplinasRepository } from "../../../repositories/disciplinas.repository";
import { findByIdUseCase } from "../../../use-cases/disciplinas/findById-disciplinas";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const disciplinasRepository = new DisciplinasRepository()

    const findByIdDisciplinasUseCase = new findByIdUseCase(disciplinasRepository)

    const disciplinas = await findByIdDisciplinasUseCase.handler(id)

    return reply.status(200).send(disciplinas)
}