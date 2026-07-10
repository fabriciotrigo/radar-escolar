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
}