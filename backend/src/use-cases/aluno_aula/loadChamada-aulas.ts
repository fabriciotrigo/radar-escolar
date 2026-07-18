import { AlunoChamadaDTO, LoadChamadaResponseDTO } from "../../interfaces/LoadChamadaResponseDTO";
import { AlunoAulaRepository } from "../../repositories/aluno_aula.repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class LoadChamadaUseCase {

    constructor(
        private alunoAulaRepository: AlunoAulaRepository
    ) {}

    async execute(aulaId: number): Promise<LoadChamadaResponseDTO> {

        const rows = await this.alunoAulaRepository.loadChamada(aulaId);

        const primeiraLinha = rows[0];

        if (!primeiraLinha) {
            throw new ResourceNotFoundError; //Error("Aula não encontrada.");
        }

        const alunos: AlunoChamadaDTO[] = rows.map(row => ({
            aluno_id: row.aluno_id,
            nome: row.nome,
            presenca: row.presenca,
            participacao: row.participacao,
            nota_atividade: row.nota_atividade,
            observacao: row.observacao
        }));

        return {
            aula_id: primeiraLinha.aula_id,
            data: primeiraLinha.data,
            assunto: primeiraLinha.assunto,
            alunos
        };
    }

}