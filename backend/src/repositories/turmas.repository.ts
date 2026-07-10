import { Turmas } from '../entities/turmas.entity'
import { TurmasFilters } from '../interfaces/findTurmasFilters';
import { database } from '../lib/db'

export class TurmasRepository {
    public async create({ ano, sala, nivel, ano_letivo }: Turmas): Promise<Turmas | undefined> {
        const result = await database.clientInstance?.query<Turmas>(
            `INSERT INTO turmas (ano, sala, nivel, ano_letivo) VALUES ($1, $2, $3, $4) RETURNING *`,
            [ano, sala, nivel, ano_letivo]
        )

        return result?.rows[0]
    }

    public async findTurmas({ ano, sala, nivel, ano_letivo }: TurmasFilters): Promise<Turmas[]> {

        let sql = `
            SELECT *
            FROM turmas
            WHERE 1 = 1
        `;

        const params: any[] = [];

        if (ano !== undefined) {
            params.push(ano);
            sql += ` AND ano = $${params.length}`;
        }

        if (sala !== undefined) {
            params.push(sala);
            sql += ` AND sala = $${params.length}`;
        }

        if (nivel !== undefined) {
            params.push(nivel);
            sql += ` AND nivel = $${params.length}`;
        }

        if (ano_letivo !== undefined) {
            params.push(ano_letivo);
            sql += ` AND ano_letivo = $${params.length}`;
        }

        sql += " ORDER BY ano, sala";

        const result =
            await database.clientInstance?.query<Turmas>(
                sql,
                params
            );

        return result?.rows ?? [];
    }
}