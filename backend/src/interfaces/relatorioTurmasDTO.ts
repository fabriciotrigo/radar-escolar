export interface RelatorioTurmasDTO {
    professor_turma_id: number;
    turma: string;
    disciplina: string;
    total_alunos: number;
    total_aulas: number;
    presenca_media: number | null;
    nota_media: number | null;
    ultima_aula: Date | null;
    alunos_baixa_frequencia: number | null;
    alunos_abaixo_media: number | null;
}

export interface RelatorioTurmaResumoDTO {
    turma: string,
    disciplina: string,
    professor: string,
    total_alunos: number | null;
    total_aulas: number | null,
    frequencia_media: number | null,
    nota_media: number | null
}

export interface RelatorioTurmasNotasDTO {
    aula_id: number;
    data: Date;
    assunto: string | null;
    nota_media: number | null;
}

export interface RelatorioTurmasParticipacaoDTO {
    participacao: string | null;
    quantidade: number | null;
}

export interface RelatorioTurmasAlunosDTO {
    aluno_id: number;
    nome: string;
    frequencia: number | null;
    nota_media: number | null;
    participacao_media: string | null;
    alerta: boolean;
}