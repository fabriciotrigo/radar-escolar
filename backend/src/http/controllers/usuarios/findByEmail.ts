import { FastifyReply, FastifyRequest } from "fastify";
import z, { email } from "zod";
import { UsuariosRepository } from "../../../repositories/usuarios.repository"
import { FindByEmailUseCase } from "../../../use-cases/usuarios/findByEmail-usuarios";

export async function findByEmail(request: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        email: z.string()
    })

    const { email } = registerParamsSchema.parse(request.params)

    const usuariosRepository = new UsuariosRepository()

    const findByUsernameUseCase = new FindByEmailUseCase(usuariosRepository)

    const usuarios = await findByUsernameUseCase.handler(email)

    return reply.status(200).send(usuarios)
}