import { RelatoriosAlunoDTO } from "../../interfaces/relatorioAlunoDTO";
import { RelatoriosAlunoRepository } from "../../repositories/relatorios_aluno.repository";

export class RelatoriosAlunoUseCase {

    constructor(private relatoriosAlunoRepository: RelatoriosAlunoRepository) {}

    public async handler(professorTurmaId: number, alunoId: number): Promise<RelatoriosAlunoDTO | null> {
        const response = await this.relatoriosAlunoRepository.relatoriosAluno(professorTurmaId, alunoId)
        return response
    }
}