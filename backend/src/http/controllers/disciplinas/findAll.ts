import { FastifyReply, FastifyRequest } from "fastify";
import { DisciplinasRepository } from "../../../repositories/disciplinas.repository";
import { findAllUseCase } from "../../../use-cases/disciplinas/findAll-disciplinas";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
    const disciplinasRepository = new DisciplinasRepository()

    const findAllDisciplinasUseCase = new findAllUseCase(disciplinasRepository)

    const disciplinas = await findAllDisciplinasUseCase.handler()

    return reply.status(200).send(disciplinas)
}