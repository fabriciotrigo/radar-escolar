import { ProfessorTurma } from "../../entities/professor_turma.entity";
import { ProfessorTurmaRepository } from "../../repositories/professor_turma.repository";

export class createProfessorTurmaUseCase {
    constructor(private professorTurmaRepository: ProfessorTurmaRepository) {}

    async handler(professor_turma: ProfessorTurma): Promise<ProfessorTurma | undefined> {
        return this.professorTurmaRepository.create(professor_turma)
    }
}