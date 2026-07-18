import { FastifyInstance } from "fastify"
import { updateChamada } from "./updateChamada"
import { loadChamada } from "./loadChamada"

export async function alunoAulaRoutes(app: FastifyInstance) {
    app.get('/aulas/:id/chamada', loadChamada) // :id = aula_id
    app.put('/aulas/:id/chamada', updateChamada) // :id = aula_id
}
