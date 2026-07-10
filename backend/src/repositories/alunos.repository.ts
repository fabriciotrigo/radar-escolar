import { Alunos } from '../entities/alunos.entity'
import { database } from '../lib/db'

export class AlunosRepository {
    public async create({ nome, data_nasc }: Alunos): Promise<Alunos | undefined> {
        const result = await database.clientInstance?.query<Alunos>(
            `INSERT INTO alunos (nome, data_nasc) VALUES ($1, $2) RETURNING *`,
            [nome, data_nasc]
        )

        return result?.rows[0]
    }
}