import { Alunos } from "../../entities/alunos.entity";
import { AlunosRepository } from "../../repositories/alunos.repository";

export class createAlunosUseCase {
    constructor(private alunosRepository: AlunosRepository) {}

    async handler(alunos: Alunos): Promise<Alunos | undefined> {
        return this.alunosRepository.create(alunos)
    }
}