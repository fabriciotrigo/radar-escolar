import { RelatorioTurmasDTO,
         RelatorioTurmasNotasDTO,
         RelatorioTurmasParticipacaoDTO,
         RelatorioTurmasAlunosDTO,
         RelatorioTurmaResumoDTO
        }
from '../interfaces/relatorioTurmasDTO'

import { database } from '../lib/db'

export class RelatoriosRepository {
    /*Relatório resumido de todas as turmas do professor*/
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
    /*Relatório Resumido de uma Turma específica*/
    public async relatorioTurmaResumo(professorTurmaId: number): Promise<RelatorioTurmaResumoDTO | null> {
        const result = await database.clientInstance!.query(
            `
            SELECT
                t.ano || 'º ' || t.sala                 AS turma,
                d.nome                                  AS disciplina,
                u.nome                                  AS professor,
                COUNT(DISTINCT at.aluno_id)             AS total_alunos,
                COUNT(DISTINCT a.id)                    AS total_aulas,
                ROUND(
                    AVG(
                        CASE
                            WHEN aa.presenca THEN 100
                            ELSE 0
                        END
                    ),
                    1
                )                                       AS frequencia_media,
                ROUND(
                    AVG(aa.nota_atividade),
                    1
                )                                       AS nota_media
            FROM professor_turma pt

            INNER JOIN turmas t
                ON t.id = pt.turma_id

            INNER JOIN disciplinas d
                ON d.id = pt.disciplina_id

            INNER JOIN usuarios u
                ON u.id = pt.professor_id

            LEFT JOIN aluno_turma at
                ON at.turma_id = t.id

            LEFT JOIN aulas a
                ON a.professor_turma_id = pt.id

            LEFT JOIN aluno_aula aa
                ON aa.aula_id = a.id
            AND aa.aluno_id = at.aluno_id

            WHERE pt.id = $1

            GROUP BY
                t.ano,
                t.sala,
                d.nome,
                u.nome;
                `,
            [professorTurmaId]
        )

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        return {
            turma: row.turma,
            disciplina: row.disciplina,
            professor: row.professor,
            total_alunos: Number(row.total_alunos),
            total_aulas: Number(row.total_aulas),
            frequencia_media: Number(row.frequencia_media),
            nota_media:
                row.nota_media !== null
                    ? Number(row.nota_media)
                    : null
        };
    }

    /* Relatório geral de notas da turma */
    public async relatorioTurmasNotas(professorTurmaId: number): Promise<RelatorioTurmasNotasDTO[]> {
        const result = await database.clientInstance!.query<RelatorioTurmasNotasDTO>(
            `
            SELECT a.id aula_id, a.data, a.assunto,
                   ROUND(AVG(aa.nota_atividade), 1) AS nota_media
              FROM aulas a
             INNER JOIN aluno_aula aa
                ON aa.aula_id = a.id
             WHERE a.professor_turma_id = $1
               AND aa.nota_atividade IS NOT NULL
             GROUP BY a.id,
                      a.data,
                      a.assunto
             ORDER BY a.data;
            `,
            [professorTurmaId]
        )

        //return result?.rows ?? []
        return result.rows.map(row => ({
            aula_id: row.aula_id,
            data: row.data,
            assunto: row.assunto,
            nota_media: Number(row.nota_media)
        }));
    }
    /* Relatório geral de participacao da turma */
    public async relatorioTurmasParticipacao(professorTurmaId: number): Promise<RelatorioTurmasParticipacaoDTO[]> {
        const result = await database.clientInstance!.query<RelatorioTurmasParticipacaoDTO>(
            `
            SELECT participacao,
                   COUNT(*) AS quantidade
            FROM aulas a
            INNER JOIN aluno_aula aa
                ON aa.aula_id = a.id
            WHERE a.professor_turma_id = $1
            GROUP BY participacao;
            `,
            [professorTurmaId]
        )
        
        //return result?.rows ?? []
        return result.rows.map(row => ({
            participacao: row.participacao,
            quantidade: Number(row.quantidade)
        }));
    }
    /* Relatório geral de alunos da turma (lista de alunos com dados) */
    public async relatorioTurmasAlunos(professorTurmaId: number): Promise<RelatorioTurmasAlunosDTO[]> {
        const result = await database.clientInstance!.query<RelatorioTurmasAlunosDTO>(
            `
            SELECT 
                al.id aluno_id,
                al.nome,
                ROUND(AVG(CASE
                            WHEN aa.presenca THEN 100
                            ELSE 0
                        END), 1) AS frequencia,
                ROUND(
                    AVG(aa.nota_atividade),
                    1
                ) AS nota_media,

                CASE
                    WHEN AVG(
                        CASE aa.participacao
                            WHEN 'ALTA' THEN 3
                            WHEN 'MEDIA' THEN 2
                            WHEN 'BAIXA' THEN 1
                        END
                    ) >= 2.5
                    THEN 'ALTA'
                    WHEN AVG(
                        CASE aa.participacao
                            WHEN 'ALTA' THEN 3
                            WHEN 'MEDIA' THEN 2
                            WHEN 'BAIXA' THEN 1
                        END
                    ) >= 1.5
                    THEN 'MEDIA'
                    ELSE 'BAIXA'
                END AS participacao_media,

                CASE
                    WHEN
                        ROUND(
                            AVG(
                                CASE
                                    WHEN aa.presenca THEN 100
                                    ELSE 0
                                END
                            ),
                            1
                        ) < 75
                        OR
                        ROUND(
                            AVG(aa.nota_atividade),
                            1
                        ) < 6
                    THEN true
                    ELSE false
                END AS alerta

            FROM alunos al

            INNER JOIN aluno_turma at
                ON at.aluno_id = al.id

            INNER JOIN aulas a
                ON a.professor_turma_id = $1

            INNER JOIN aluno_aula aa
                ON aa.aluno_id = al.id
            AND aa.aula_id = a.id

            WHERE at.turma_id = (
                SELECT turma_id
                FROM professor_turma
                WHERE id = $1
            )

            GROUP BY
                al.id,
                al.nome

            ORDER BY alerta DESC, al.nome ASC;
            `,
            [professorTurmaId]
        )
        
        //return result?.rows ?? []
        return result.rows.map(row => ({
            aluno_id: row.aluno_id,
            nome: row.nome,
            frequencia: Number(row.frequencia),
            nota_media: Number(row.nota_media),
            participacao_media: row.participacao_media,
            alerta: row.alerta
        }));
    }
}