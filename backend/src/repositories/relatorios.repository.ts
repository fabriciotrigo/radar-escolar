import { RelatorioTurmasDTO } from '../interfaces/relatorioTurmasDTO'
import { database } from '../lib/db'

export class RelatoriosRepository {

    public async relatorioTurmas(professorId: number): Promise<RelatorioTurmasDTO[]> {

        const result = await database.clientInstance!.query<RelatorioTurmasDTO>(
            `
            SELECT pt.id AS professor_turma_id,
                t.ano||'º '||t.sala AS turma,
                d.nome AS disciplina,

                /* Quantidade de alunos */
                ( SELECT COUNT(*)
                    FROM aluno_turma at
                    WHERE at.turma_id = pt.turma_id ) AS total_alunos,

                /* Quantidade de aulas */
                ( SELECT COUNT(*)
                    FROM aulas a
                    WHERE a.professor_turma_id = pt.id ) AS total_aulas,

                /* Presença média da turma */
                ( SELECT ROUND(AVG(CASE WHEN aa.presenca THEN 100 ELSE 0 END), 1 )
                    FROM aulas a
                    INNER JOIN aluno_aula aa
                            ON aa.aula_id = a.id
                    WHERE a.professor_turma_id = pt.id
                ) AS presenca_media,

                /* Nota média da turma */
                ( SELECT ROUND(AVG(aa.nota_atividade), 1)
                    FROM aulas a
                    INNER JOIN aluno_aula aa
                        ON aa.aula_id = a.id
                    WHERE a.professor_turma_id = pt.id ) AS nota_media,
                
                /* Última aula */
                ( SELECT MAX(a.data)
                    FROM aulas a
                    WHERE a.professor_turma_id = pt.id ) AS ultima_aula,
                
                /* Alunos com frequência inferior a 75% */
                ( SELECT COUNT(*)
                    FROM (
                        SELECT
                            aa.aluno_id
                        FROM aulas a
                        INNER JOIN aluno_aula aa
                            ON aa.aula_id = a.id
                        WHERE a.professor_turma_id = pt.id
                        GROUP BY aa.aluno_id
                        HAVING
                            AVG(
                                CASE
                                    WHEN aa.presenca THEN 100
                                    ELSE 0
                                END
                            ) < 75
                    ) frequencia
                ) AS alunos_baixa_frequencia,

                /* Alunos com média inferior a 6 */
                (
                    SELECT COUNT(*)
                    FROM (
                            SELECT
                                aa.aluno_id
                            FROM aulas a
                            INNER JOIN aluno_aula aa
                                ON aa.aula_id = a.id
                            WHERE a.professor_turma_id = pt.id
                            AND EXISTS (
                                SELECT 1
                                FROM aluno_aula aa2
                                WHERE aa2.aula_id = a.id
                                AND aa2.nota_atividade IS NOT NULL
                            )
                            GROUP BY aa.aluno_id
                            HAVING AVG(aa.nota_atividade) < 6
                    ) notas
                ) AS alunos_abaixo_media
            FROM professor_turma pt
            INNER JOIN turmas t
                ON t.id = pt.turma_id
            INNER JOIN disciplinas d
                ON d.id = pt.disciplina_id
            WHERE pt.professor_id = $1
            ORDER BY 2;
            `,
            [professorId]
        )

        //return result?.rows ?? []
        return result.rows.map(row => ({
            professor_turma_id: Number(row.professor_turma_id),
            turma: row.turma,
            disciplina: row.disciplina,

            total_alunos: Number(row.total_alunos),
            total_aulas: Number(row.total_aulas),

            presenca_media: row.presenca_media === null
                ? null
                : Number(row.presenca_media),

            nota_media: row.nota_media === null
                ? null
                : Number(row.nota_media),

            ultima_aula: row.ultima_aula,

            alunos_baixa_frequencia: Number(row.alunos_baixa_frequencia),
            alunos_abaixo_media: Number(row.alunos_abaixo_media)
        }));
    }
}