import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findByEmail } from './findByEmail'
import { signin } from './signin'


export async function usuariosRoutes(app: FastifyInstance) {
    app.get('/usuarios/:email', findByEmail)
    app.post('/usuarios', create)
    app.post('/usuarios/signin', signin)
}