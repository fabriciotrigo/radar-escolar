import { Disciplinas } from "../../entities/disciplinas.entity";
import { DisciplinasRepository } from "../../repositories/disciplinas.repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

export class findByIdUseCase {
    constructor(private disciplinasRepository: DisciplinasRepository) {}

    async handler(disciplinasId: number): Promise<Disciplinas | undefined> {
        const disciplinas = await this.disciplinasRepository.findById(disciplinasId)
        if (!disciplinas) throw new ResourceNotFoundError()
        return disciplinas
    }
}