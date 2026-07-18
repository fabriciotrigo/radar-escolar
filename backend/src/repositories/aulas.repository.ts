import { Aulas } from '../entities/aulas.entity'
import { database } from '../lib/db'

export class AulasRepository {
    public async create({ professor_turma_id, data, assunto }: Aulas): Promise<Aulas | undefined> {
        const result = await database.clientInstance?.query<Aulas>(
            `INSERT INTO aulas (professor_turma_id, data, assunto) VALUES ($1, $2, $3) RETURNING *`,
            [professor_turma_id, data, assunto]
        )

        return result?.rows[0]
    }

    /*Lista todas as aulas do professor na turma desejada*/
    public async loadAulas(
        professorTurmaId: number,
        page = 1,
        limit = 10
    ) {

        const offset = (page - 1) * limit;

        const totalResult = await database.clientInstance!.query(
            `
            SELECT COUNT(*) AS total
            FROM aulas
            WHERE professor_turma_id = $1
            `,
            [professorTurmaId]
        );

        const total = Number(totalResult.rows[0].total);

        const aulas = await database.clientInstance!.query(
            `
            SELECT
                a.id AS aula_id,
                a.data,
                a.assunto,
                ROUND(
                    AVG(
                        CASE
                            WHEN aa.presenca THEN 100
                            ELSE 0
                        END
                    ),
                    1
                ) AS percentual_presenca,
                
                CASE
                    WHEN AVG(
                        CASE aa.participacao
                            WHEN 'ALTA' THEN 3
                            WHEN 'MEDIA' THEN 2
                            WHEN 'BAIXA' THEN 1
                            ELSE 0
                        END
                    ) >= 2.5 THEN 'ALTA'
                    WHEN AVG(
                        CASE aa.participacao
                            WHEN 'ALTA' THEN 3
                            WHEN 'MEDIA' THEN 2
                            WHEN 'BAIXA' THEN 1
                            ELSE 0
                        END
                    ) >= 1.5 THEN 'MEDIA'
                    WHEN AVG(
                        CASE aa.participacao
                            WHEN 'ALTA' THEN 3
                            WHEN 'MEDIA' THEN 2
                            WHEN 'BAIXA' THEN 1
                            ELSE 0
                        END
                    ) > 0 THEN 'BAIXA'
                    ELSE 'NAO_INFORMADA'
                END AS participacao_media,

                ROUND(AVG(COALESCE(aa.nota_atividade,0)),1) AS nota_media

            FROM aulas a
            INNER JOIN aluno_aula aa
                ON aa.aula_id = a.id
            WHERE a.professor_turma_id = $1
            GROUP BY
                a.id,
                a.data,
                a.assunto
            ORDER BY
                a.data DESC
            LIMIT $2
            OFFSET $3
            `,
            [professorTurmaId, limit, offset]
        );

        return {
            data: aulas.rows,
            total
        };
    }
}