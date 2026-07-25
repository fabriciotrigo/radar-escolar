import { RelatorioTurmasAlunosDTO } from "../../interfaces/relatorioTurmasDTO";
import { RelatoriosRepository } from "../../repositories/relatorios.repository";

export class RelatorioTurmasAlunosUseCase {

    constructor(private relatorioTurmasAlunosRepository: RelatoriosRepository) {}

    public async handler(professorTurmaId: number): Promise<RelatorioTurmasAlunosDTO[]> {
        const response = await this.relatorioTurmasAlunosRepository.relatorioTurmasAlunos(professorTurmaId)
        return response
    }
}