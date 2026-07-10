import { Disciplinas } from '../entities/disciplinas.entity'
import { database } from '../lib/db'

export class DisciplinasRepository {
    public async create({ nome }: Disciplinas): Promise<Disciplinas | undefined> {
        const result = await database.clientInstance?.query<Disciplinas>(
            `INSERT INTO disciplinas (nome) VALUES ($1) RETURNING *`,
            [nome]
        )

        return result?.rows[0]
    }

    public async findById(id: number): Promise<Disciplinas | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM disciplinas WHERE disciplinas.id = $1`,
            [id]
        )
        
        return result?.rows[0]
    }

    public async findAll(): Promise<Disciplinas[] | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT d.* FROM disciplinas d ORDER BY d.nome`,
        )

        return result?.rows ?? [ ]
    }
}