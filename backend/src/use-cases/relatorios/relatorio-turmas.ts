import { RelatorioTurmasDTO } from "../../interfaces/relatorioTurmasDTO";
import { RelatoriosRepository } from "../../repositories/relatorios.repository";

export class RelatorioTurmasUseCase {

    constructor(private relatorioTurmasRepository: RelatoriosRepository) {}

    public async handler(professorId: number): Promise<RelatorioTurmasDTO[]> {
        const response = await this.relatorioTurmasRepository.relatorioTurmas(professorId)
        return response
    }
}