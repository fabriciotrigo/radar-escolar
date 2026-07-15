import { AlunoTurma } from "../../entities/aluno_turma.entity";
import { AlunoTurmaRepository } from "../../repositories/aluno_turma.repository";

export class createAlunoTurmaUseCase {
    constructor(private alunoTurmaRepository: AlunoTurmaRepository) {}

    async handler(aluno_turma: AlunoTurma): Promise<AlunoTurma | undefined> {
        return this.alunoTurmaRepository.create(aluno_turma)
    }
}