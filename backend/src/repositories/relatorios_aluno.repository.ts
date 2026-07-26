import { database } from '../lib/db'
import { RelatoriosAlunoDTO, AulaAlunoDTO } from '../interfaces/relatorioAlunoDTO'

export class RelatoriosAlunoRepository {
    /*Relatório Geral do Aluno em uma Turma*/
    public async relatoriosAluno(professorTurmaId: number, alunoId: number): Promise<RelatoriosAlunoDTO | null> {
        const resumoResult = await database.clientInstance!.query(
            `
            SELECT
                al.id,
                al.nome,
                t.ano || 'º ' || t.sala AS turma,
                d.nome AS disciplina,
                COUNT(a.id) AS total_aulas,
                COUNT(
                    CASE
                        WHEN aa.presenca THEN 1
                    END
                ) AS presencas,
                COUNT(
                    CASE
                        WHEN aa.presenca = FALSE THEN 1
                    END
                ) AS faltas,
                ROUND(
                    AVG(
                        CASE
                            WHEN aa.presenca THEN 100
                            ELSE 0
                        END
                    ),
                    1
                ) AS frequencia,
                ROUND(
                    AVG(aa.nota_atividade),
                    1
                ) AS nota_media,
                (
                    SELECT moda.participacao
                    FROM (
                        SELECT
                            aa2.participacao,
                            COUNT(*) quantidade
                        FROM aluno_aula aa2
                        JOIN aulas a2
                            ON a2.id = aa2.aula_id
                        WHERE
                            aa2.aluno_id = al.id
                            AND a2.professor_turma_id = pt.id
                        GROUP BY aa2.participacao
                        ORDER BY quantidade DESC
                        LIMIT 1
                    ) moda
                ) AS participacao_media,
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
                    THEN TRUE
                    ELSE FALSE
                END AS alerta
            FROM professor_turma pt
            JOIN aulas a
                ON a.professor_turma_id = pt.id
            JOIN aluno_aula aa
                ON aa.aula_id = a.id
            JOIN alunos al
                ON al.id = aa.aluno_id
            JOIN disciplinas d 
                ON d.id = pt.disciplina_id 
            JOIN turmas t
                ON t.id = pt.turma_id 
            WHERE pt.id = $1
            AND al.id = $2
            GROUP BY al.id,
                    al.nome,
                    pt.id,
                    t.ano,
                    t.sala,
                    d.nome
            `,
            [professorTurmaId, alunoId]
        );
        
        if (resumoResult.rows.length === 0) {
            throw new Error("Aluno não encontrado.");
        }

        const historicoResult = await database.clientInstance!.query(
            `
            SELECT
                a.id AS aula_id,
                a.data,
                a.assunto,
                aa.presenca,
                aa.participacao,
                aa.nota_atividade,
                aa.observacao

            FROM aulas a

            JOIN aluno_aula aa
                ON aa.aula_id = a.id

            WHERE
                a.professor_turma_id = $1
                AND aa.aluno_id = $2

            ORDER BY
                a.data DESC,
                a.id DESC
            `,
            [professorTurmaId, alunoId]
        );

        const resumo = resumoResult.rows[0];

        const historico: AulaAlunoDTO[] = historicoResult.rows.map((row) => ({
            aulaId: Number(row.aula_id),
            data: row.data,
            assunto: row.assunto,
            presenca: row.presenca,
            participacao: row.participacao,
            notaAtividade:
                row.nota_atividade !== null
                    ? Number(row.nota_atividade)
                    : null,
            observacao: row.observacao,
        }));

        return {
            aluno: {
                id: Number(resumo.id),
                nome: resumo.nome,
                turma: resumo.turma,
                disciplina: resumo.disciplina
            },

            resumo: {
                frequencia: Number(resumo.frequencia),
                notaMedia:
                    resumo.nota_media !== null
                        ? Number(resumo.nota_media)
                        : null,
                participacaoMedia: resumo.participacao_media,
                totalAulas: Number(resumo.total_aulas),
                presencas: Number(resumo.presencas),
                faltas: Number(resumo.faltas),
                alerta: resumo.alerta,
            },

            historico,
        };
    }
}