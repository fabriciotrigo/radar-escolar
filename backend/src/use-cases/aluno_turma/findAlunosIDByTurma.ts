import { AlunoTurmaRepository } from "../../repositories/aluno_turma.repository"

export class FindAlunosIDByTurmaUseCase {

    constructor(
        private alunoTurmaRepository: AlunoTurmaRepository
    ) {}

    public async handler(turma_id: number): Promise<number[]> {

        const alunosID = await this.alunoTurmaRepository.findAlunosIDByTurma(turma_id)

        return alunosID
    }

}