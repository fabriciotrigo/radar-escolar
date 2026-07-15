import { AlunoTurma } from "../entities/aluno_turma.entity";
import { AlunosTurmaDTO } from "../interfaces/alunosTurmaDTO";
import { database } from "../lib/db";

export class AlunoTurmaRepository {
    public async create({ aluno_id, turma_id }: AlunoTurma): Promise<AlunoTurma | undefined> {
        const result = await database.clientInstance?.query<AlunoTurma>(
            `INSERT INTO aluno_turma (aluno_id, turma_id) VALUES ($1, $2) RETURNING *`,
            [aluno_id, turma_id]
        )

        return result?.rows[0]
    }

    public async findAlunosTurma(turma_id: number): Promise<AlunosTurmaDTO[]> {
        const result = await database.clientInstance?.query(
            `
            SELECT A.*
              FROM ALUNO_TURMA AT
                 , ALUNOS A
             WHERE AT.ALUNO_ID = A.ID
               AND AT.TURMA_ID = $1
             ORDER BY A.NOME
            `,
            [turma_id]
        )

        return result?.rows ?? []
    }

    public async findAlunosIDByTurma(turma_id: number): Promise<number[]> {
        const result = await database.clientInstance?.query(
            `
            SELECT aluno_id
            FROM aluno_turma
            WHERE turma_id = $1
            `,
            [turma_id]
        )

        return result?.rows.map(row => row.aluno_id) ?? []
    }
}