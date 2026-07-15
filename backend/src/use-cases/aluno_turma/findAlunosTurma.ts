import { AlunoTurmaRepository } from "../../repositories/aluno_turma.repository"
import { AlunosTurmaDTO } from "../../interfaces/alunosTurmaDTO"

export class FindAlunosTurmaUseCase {

    constructor(
        private alunoTurmaRepository: AlunoTurmaRepository
    ) {}

    public async handler(turma_id: number): Promise<AlunosTurmaDTO[]> {

        const alunos = await this.alunoTurmaRepository.findAlunosTurma(turma_id)

        return alunos
    }

}