import { Participacao } from "../types/participacao_aluno_aula"

export interface AlunoChamadaDTO {
    aluno_id: number;
    nome: string;
    presenca: boolean;
    participacao: Participacao;
    nota_atividade: number | null;
    observacao: string | null;
}

export interface LoadChamadaResponseDTO {
    aula_id: number;
    data: Date;
    assunto: string;
    alunos: AlunoChamadaDTO[];
}

export interface LoadChamadaRowDTO {
    aula_id: number;
    data: Date;
    assunto: string;
    aluno_id: number;
    nome: string;
    presenca: boolean;
    participacao: Participacao;
    nota_atividade: number | null;
    observacao: string | null;
}