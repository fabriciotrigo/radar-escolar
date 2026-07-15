import { AlunoAula } from '../entities/aluno_aula.entity'
import { database } from '../lib/db'

export class AlunoAulaRepository {

    public async createMany(
        aulaId: number,
        alunos: number[]
    ): Promise<void> {

        if (alunos.length === 0) return;

        const values: (number | boolean | string)[] = []
        const placeholders: string[] = [];

        let parametro = 1;

        alunos.forEach((alunoId) => {

            placeholders.push(
                `($${parametro++}, $${parametro++}, $${parametro++}, $${parametro++})`
            );

            values.push(
                aulaId,
                alunoId,
                true,
                "NAO_INFORMADA"
            );

        });

        await database.clientInstance?.query(
            `
            INSERT INTO aluno_aula (
                aula_id,
                aluno_id,
                presenca,
                participacao
            )
            VALUES ${placeholders.join(", ")}
            `,
            values
        );
    }

    /* atualizar presença, participação e nota da atividade do aluno na aula */
    public async update(alunoAula: AlunoAula): Promise<AlunoAula | undefined> {

        const result = await database.clientInstance?.query<AlunoAula>(
            `
            UPDATE aluno_aula
               SET presenca = $1,
                   participacao = $2,
                   nota_atividade = $3
             WHERE aula_id = $4
               AND aluno_id = $5
         RETURNING *
            `,
            [
                alunoAula.presenca,
                alunoAula.participacao,
                alunoAula.nota_atividade,
                alunoAula.aula_id,
                alunoAula.aluno_id
            ]
        )

        return result?.rows[0]
    }
}