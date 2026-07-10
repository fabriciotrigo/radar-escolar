import { NivelEnsino } from "../types/nivel_turmas";

export class Turmas {
    id?: number;
    ano: number;
    sala: string;
    nivel: NivelEnsino;
    ano_letivo: number;

    constructor(
        ano: number,
        sala: string,
        nivel: NivelEnsino,
        ano_letivo: number
    ) {
        this.ano = ano;
        this.sala = sala;
        this.nivel = nivel;
        this.ano_letivo = ano_letivo;
    }
}