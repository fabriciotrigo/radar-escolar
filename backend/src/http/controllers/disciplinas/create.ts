import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { DisciplinasRepository } from "../../../repositories/disciplinas.repository";
import { createDisciplinasUseCase } from "../../../use-cases/disciplinas/create-disciplinas";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        nome: z.string()
    })

    const nome = registerBodySchema.parse(request.body)

    const disciplinasRepository = new DisciplinasRepository()
    const createDisciplinas = new createDisciplinasUseCase(disciplinasRepository)

    const disciplinas = await createDisciplinas.handler(nome)

    return reply.status(201).send(disciplinas)

}