import { Disciplinas } from "../../entities/disciplinas.entity";
import { DisciplinasRepository } from "../../repositories/disciplinas.repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class findAllUseCase {
    constructor(private disciplinasRepository: DisciplinasRepository) {}

    async handler(): Promise<Disciplinas[] | undefined> {
        const disciplinas = await this.disciplinasRepository.findAll()
        if (!disciplinas) throw new ResourceNotFoundError()
        return disciplinas
    }
}