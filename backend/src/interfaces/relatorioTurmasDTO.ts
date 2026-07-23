export interface RelatorioTurmasDTO {
    professor_turma_id: number;
    turma: string;
    disciplina: string;
    total_alunos: number;
    total_aulas: number;
    presenca_media: number | null;
    nota_media: number | null;
    ultima_aula: Date | null;
    alunos_baixa_frequencia: number;
    alunos_abaixo_media: number;
}