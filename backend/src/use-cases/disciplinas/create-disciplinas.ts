import { Disciplinas } from "../../entities/disciplinas.entity";
import { DisciplinasRepository } from "../../repositories/disciplinas.repository";

export class createDisciplinasUseCase {
    constructor(private disciplinasRepository: DisciplinasRepository) {}

    async handler(disciplinas: Disciplinas): Promise<Disciplinas | undefined> {
        return this.disciplinasRepository.create(disciplinas)
    }
}