export interface RelatoriosAlunoDTO {
    aluno: {
        id: number;
        nome: string;
        turma: string;
        disciplina: string;
    };

    resumo: {
        frequencia: number;
        notaMedia: number | null;
        participacaoMedia: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
        totalAulas: number;
        presencas: number;
        faltas: number;
        alerta: boolean;
    };

    historico: AulaAlunoDTO[];
}

export interface AulaAlunoDTO {
    aulaId: number;
    data: string;
    assunto: string;
    presenca: boolean;
    participacao: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
    notaAtividade: number | null;
    observacao: string | null;
}