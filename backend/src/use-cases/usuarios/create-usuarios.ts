import { Usuarios } from "../../entities/usuarios.entity";
import { UsuariosRepository } from "../../repositories/usuarios.repository";

export class CreateUsuariosUseCase {
    constructor(private UsuariosRepository: UsuariosRepository) {}

    async handler(Usuarios: Usuarios): Promise<Usuarios | undefined> {
        return this.UsuariosRepository.create(Usuarios)
    }
}