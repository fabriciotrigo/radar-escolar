import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { UsuariosRepository } from "../../../repositories/usuarios.repository"
import { CreateUsuariosUseCase } from "../../../use-cases/usuarios/create-usuarios"
import { hash } from 'bcryptjs'
import { perfilSchema } from '../../../types/perfil_usuarios'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        email: z.string(),
        senha: z.string(),
        nome: z.string(),
        perfil: perfilSchema
    })

    const { email, senha, nome, perfil } = registerBodySchema.parse(request.body)

    const hashedPassword = await hash(senha, 8)
    const userWithHashedPassword = { email, senha: hashedPassword, nome, perfil }

    const usuariosRepository = new UsuariosRepository()
    const createUsuariosUseCase = new CreateUsuariosUseCase(usuariosRepository)

    const usuarios = await createUsuariosUseCase.handler(userWithHashedPassword)

    return reply.status(201).send(usuarios)

}