import { Usuarios } from "../../entities/usuarios.entity"
import { UsuariosRepository } from "../../repositories/usuarios.repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class FindByEmailUseCase {
    constructor(private UsuariosRepository: UsuariosRepository) {}

    async handler(email: string): Promise<Usuarios | undefined> {
        const Usuarios = await this.UsuariosRepository.findByEmail(email)
        if (!Usuarios) throw new ResourceNotFoundError()
        return Usuarios
    }
}