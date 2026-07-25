import { RelatorioTurmasParticipacaoDTO } from "../../interfaces/relatorioTurmasDTO";
import { RelatoriosRepository } from "../../repositories/relatorios.repository";

export class RelatorioTurmasParticipacaoUseCase {

    constructor(private relatorioTurmasParticipacaoRepository: RelatoriosRepository) {}

    public async handler(professorTurmaId: number): Promise<RelatorioTurmasParticipacaoDTO[]> {
        const response = await this.relatorioTurmasParticipacaoRepository.relatorioTurmasParticipacao(professorTurmaId)
        return response
    }
}