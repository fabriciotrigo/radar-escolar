/*
import { Aulas } from "../../entities/aulas.entity";
import { AulasRepository } from "../../repositories/aulas.repository";

export class createAulasUseCase {
    constructor(private aulasRepository: AulasRepository) {}

    async handler(aulas: Aulas): Promise<Aulas | undefined> {
        const aula = await this.aulasRepository.create(aulas)

        return aula
    }
}
*/
import { Aulas } from "../../entities/aulas.entity";

import { AulasRepository } from "../../repositories/aulas.repository";
import { ProfessorTurmaRepository } from "../../repositories/professor_turma.repository";
import { AlunoTurmaRepository } from "../../repositories/aluno_turma.repository";
import { AlunoAulaRepository } from "../../repositories/aluno_aula.repository";

export class createAulasUseCase {

    constructor(
        private aulasRepository: AulasRepository,
        private professorTurmaRepository: ProfessorTurmaRepository,
        private alunoTurmaRepository: AlunoTurmaRepository,
        private alunoAulaRepository: AlunoAulaRepository
    ) {}

    async handler(aula: Aulas): Promise<Aulas | undefined> {

        // 1 - Descobre a turma do professor
        const professorTurma =
            await this.professorTurmaRepository.findById(
                aula.professor_turma_id
            )

        if (!professorTurma) {
            throw new Error("Professor/Turma não encontrado.")
        }

        // 2 - Busca todos os alunos da turma
        const alunos =
            await this.alunoTurmaRepository.findAlunosIDByTurma(
                professorTurma.turma_id
            )

        // 3 - Cria a aula
        const novaAula =
            await this.aulasRepository.create(aula)

        if (!novaAula) {
            throw new Error("Erro ao criar aula.")
        }

        // 4 - Vincula todos os alunos à aula
        await this.alunoAulaRepository.createMany(
            novaAula.id!,
            alunos
        )

        return novaAula
    }

}