import { AlunoAula } from "../../entities/aluno_aula.entity";
import { AlunoAulaRepository } from "../../repositories/aluno_aula.repository";

export class UpdateChamadaUseCase {

    constructor(
        private alunoAulaRepository: AlunoAulaRepository
    ) {}

    public async handler(
        alunosAula: AlunoAula[]
    ): Promise<void> {
        for (const alunoAula of alunosAula) {

            await this.alunoAulaRepository.updateChamada(alunoAula)
            
        }
    }
}