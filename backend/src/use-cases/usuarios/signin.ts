import { UsuariosRepository } from '../../repositories/usuarios.repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

export class SigninUseCase {
  constructor(private readonly UsuariosRepository: UsuariosRepository) {}

  async handler(email: string) {
    const usuario = await this.UsuariosRepository.findByEmail(email)

    if (!usuario) {
      throw new InvalidCredentialsError()
    }

    return usuario
  }
}