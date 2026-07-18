import { ProfessorTurma } from "../entities/professor_turma.entity";
import { ProfessorTurmaDashboardDTO } from "../interfaces/professorTurmaDashboardDTO"
import { database } from "../lib/db";

export class ProfessorTurmaRepository {
    /*cria a professor_turma, associando o professor a uma turma e a uma disciplina*/
    public async create({ professor_id, turma_id, disciplina_id }: ProfessorTurma): Promise<ProfessorTurma | undefined> {
        const result = await database.clientInstance?.query<ProfessorTurma>(
            `INSERT INTO professor_turma (professor_id, turma_id, disciplina_id) VALUES ($1, $2, $3) RETURNING *`,
            [professor_id, turma_id, disciplina_id]
        )

        return result?.rows[0]
    }    

    /*Utilizado para encontrar o turma_id a partir do professor_turma_id que já temos na tela*/
    public async findById(id: number): Promise<ProfessorTurma | undefined> {

        const result = await database.clientInstance?.query<ProfessorTurma>(
            `
            SELECT *
            FROM professor_turma
            WHERE id = $1
            `,
            [id]
        )

        return result?.rows[0]
    }

    /*cria a tela inicial do professor ao fazer login*/
    public async findDashboard(professorId: number, anoLetivo: number): Promise<ProfessorTurmaDashboardDTO[]> {

        const result = await database.clientInstance?.query<ProfessorTurmaDashboardDTO>(
            `
            SELECT
                pt.id AS professor_turma_id,
                t.id AS turma_id,
                t.ano,
                t.sala,
                d.nome AS disciplina,
                COUNT(at.aluno_id) AS quantidade_alunos
            FROM professor_turma pt
            INNER JOIN turmas t
                ON t.id = pt.turma_id
            INNER JOIN disciplinas d
                ON d.id = pt.disciplina_id
            LEFT JOIN aluno_turma at
                ON at.turma_id = t.id
            WHERE pt.professor_id = $1
              AND t.ano_letivo = $2
            GROUP BY
                pt.id,
                t.id,
                t.ano,
                t.sala,
                d.nome
            ORDER BY
                t.ano,
                t.sala,
                d.nome
            `,
            [professorId, anoLetivo]
        )

        return result?.rows ?? []
    }
    
}