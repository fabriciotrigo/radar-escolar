import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { TurmasRepository } from "../../../repositories/turmas.repository"
import { CreateTurmasUseCase } from "../../../use-cases/turmas/create-turmas"
import { nivelSchema } from "../../../types/nivel_turmas"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        ano: z.number(),
        sala: z.string(),
        nivel: nivelSchema,
        ano_letivo: z.number()
    })

    const { ano, sala, nivel, ano_letivo } = registerBodySchema.parse(request.body)

    const turmasRepository = new TurmasRepository()
    const createTurmasUseCase = new CreateTurmasUseCase(turmasRepository)

    const turmas = await createTurmasUseCase.handler({ ano, sala, nivel, ano_letivo })

    return reply.status(201).send(turmas)

}