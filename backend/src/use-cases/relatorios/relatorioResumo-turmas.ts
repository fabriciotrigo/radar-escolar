import { RelatorioTurmaResumoDTO } from "../../interfaces/relatorioTurmasDTO";
import { RelatoriosRepository } from "../../repositories/relatorios.repository";

export class RelatorioTurmaResumoUseCase {

    constructor(private relatorioTurmaResumoRepository: RelatoriosRepository) {}

    public async handler(professorTurmaId: number): Promise<RelatorioTurmaResumoDTO | null> {
        const response = await this.relatorioTurmaResumoRepository.relatorioTurmaResumo(professorTurmaId)
        return response
    }
}