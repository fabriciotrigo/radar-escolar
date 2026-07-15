import { Participacao } from "../types/participacao_aluno_aula";

export class AlunoAula {
    id?: number;
    aluno_id: number;
    aula_id: number;
    presenca: boolean;
    participacao: Participacao;
    nota_atividade: number | null;
    observacao: string | null;

    constructor(
        aluno_id: number,
        aula_id: number,
        presenca: boolean,
        participacao: Participacao,
        nota_atividade: number | null,
        observacao: string | null
    ) {
        this.aluno_id = aluno_id;
        this.aula_id = aula_id;
        this.presenca = presenca;
        this.participacao = participacao;
        this.nota_atividade = nota_atividade;
        this.observacao = observacao;
    }
}