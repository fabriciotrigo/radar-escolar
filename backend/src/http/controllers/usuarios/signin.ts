import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'
import { SigninUseCase } from "../../../use-cases/usuarios/signin"
import { compare } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UsuariosRepository } from '../../../repositories/usuarios.repository'

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string(),
    senha: z.string()
  })

  const { email, senha } = registerBodySchema.parse(request.body)

  const usuariosRepository = new UsuariosRepository()

  const signinUseCase = new SigninUseCase(usuariosRepository)

  const login = await signinUseCase.handler(email)

  const doestPasswordMatch = await compare(senha, login.senha)

  if (!doestPasswordMatch) {
    throw new InvalidCredentialsError()
  }

  const token = await reply.jwtSign({ 
    id: login.id,
    email: login.email,
    nome: login.nome,
    perfil: login.perfil 
  })

  return reply.status(200).send({ token })
}