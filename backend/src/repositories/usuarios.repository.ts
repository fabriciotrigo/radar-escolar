import { Usuarios } from '../entities/usuarios.entity'
import { database } from '../lib/db'

export class UsuariosRepository {
    public async findByEmail(email: string): Promise<Usuarios | undefined> {
        const result = await database.clientInstance?.query(
            `SELECT * FROM usuarios WHERE usuarios.email = $1`,
            [email]
        )
        
        return result?.rows[0]
    }

    public async create({ email, senha, nome, perfil }: Usuarios): Promise<Usuarios | undefined> {
        const result = await database.clientInstance?.query<Usuarios>(
            `INSERT INTO usuarios (email, senha, nome, perfil) VALUES ($1, $2, $3, $4) RETURNING *`,
            [email, senha, nome, perfil]
        )

        return result?.rows[0]
    }
}