import { RelatorioTurmasNotasDTO } from "../../interfaces/relatorioTurmasDTO";
import { RelatoriosRepository } from "../../repositories/relatorios.repository";

export class RelatorioTurmasNotasUseCase {

    constructor(private relatorioTurmasNotasRepository: RelatoriosRepository) {}

    public async handler(professorTurmaId: number): Promise<RelatorioTurmasNotasDTO[]> {
        const response = await this.relatorioTurmasNotasRepository.relatorioTurmasNotas(professorTurmaId)
        return response
    }
}