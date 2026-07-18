import { AlunoAula } from '../entities/aluno_aula.entity'
import { LoadChamadaRowDTO } from '../interfaces/LoadChamadaResponseDTO';
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
                false,
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
    public async updateChamada(alunoAula: AlunoAula): Promise<AlunoAula | undefined> {

        const result = await database.clientInstance?.query<AlunoAula>(
            `
            UPDATE aluno_aula
               SET presenca = $1,
                   participacao = $2,
                   nota_atividade = $3,
                   observacao = $4
             WHERE aula_id = $5
               AND aluno_id = $6
         RETURNING *
            `,
            [
                alunoAula.presenca,
                alunoAula.participacao,
                alunoAula.nota_atividade,
                alunoAula.observacao,
                alunoAula.aula_id,
                alunoAula.aluno_id
            ]
        )

        return result?.rows[0]
    }

    /*Lista todos os alunos da turma para que o professor possa atualizar os quesitos de avaliação da aula*/
    public async loadChamada(aulaId: number): Promise<LoadChamadaRowDTO[]> {

        const result = await database.clientInstance!.query<LoadChamadaRowDTO>(
            `
            SELECT
                a.id AS aula_id,
                a.data,
                a.assunto,
                aa.aluno_id,
                al.nome,
                aa.presenca,
                aa.participacao,
                aa.nota_atividade,
                aa.observacao
            FROM aulas a
            INNER JOIN aluno_aula aa
                ON aa.aula_id = a.id
            INNER JOIN alunos al
                ON al.id = aa.aluno_id
            WHERE a.id = $1
            ORDER BY al.nome;
            `,
            [aulaId]
        )

        return result?.rows ?? []
    }
}