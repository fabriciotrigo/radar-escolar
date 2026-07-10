import { Perfil } from "../types/perfil_usuarios"

export class Usuarios {
    id?: number
    email: string
    senha: string
    nome: string
    perfil: Perfil

    constructor(
        email: string,
        senha: string,
        nome: string,
        perfil: Perfil
    ) {
        this.email = email
        this.senha = senha
        this.nome = nome
        this.perfil = perfil
    }
}