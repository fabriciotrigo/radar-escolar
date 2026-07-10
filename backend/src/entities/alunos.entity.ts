export class Alunos {
    id?: number;
    nome: string;
    data_nasc: Date;

    constructor(
        nome: string,
        data_nasc: Date
    ) {
        this.nome = nome;
        this.data_nasc = data_nasc;
    }
}