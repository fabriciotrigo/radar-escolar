import { Turmas } from "../../entities/turmas.entity"
import { TurmasRepository } from "../../repositories/turmas.repository"

export class CreateTurmasUseCase {
    constructor(private TurmasRepository: TurmasRepository) {}

    async handler(turmas: Turmas): Promise<Turmas | undefined> {
        return this.TurmasRepository.create(turmas)
    }
}