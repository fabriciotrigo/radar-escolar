import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { AlunosRepository } from "../../../repositories/alunos.repository"
import { createAlunosUseCase } from "../../../use-cases/alunos/create-alunos"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        nome: z.string(),
        data_nasc: z.coerce.date()
    })

    const { nome, data_nasc } = registerBodySchema.parse(request.body)

    const alunosRepository = new AlunosRepository()
    const createAlunos = new createAlunosUseCase(alunosRepository)

    const alunos = await createAlunos.handler({ nome, data_nasc })

    return reply.status(201).send(alunos)

}