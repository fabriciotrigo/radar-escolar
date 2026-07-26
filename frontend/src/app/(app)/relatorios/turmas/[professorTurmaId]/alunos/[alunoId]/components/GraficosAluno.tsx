import CardGraficoNotas from "./CardGraficoNotas";
import CardGraficoParticipacao from "./CardGraficoParticipacao";
import CardGraficoFrequencia from "./CardGraficoFrequencia";

export interface HistoricoAluno {
    aulaId: number;
    data: string;
    assunto: string;
    presenca: boolean;
    participacao: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
    notaAtividade: number | null;
    observacao: string | null;
}

export interface ResumoAluno {
    frequencia: number;
    notaMedia: number | null;
    participacaoMedia:
        | "ALTA"
        | "MEDIA"
        | "BAIXA"
        | "NAO_INFORMADA";
    totalAulas: number;
    presencas: number;
    faltas: number;
    alerta: boolean;
}

export interface RelatorioAluno {
    aluno: {
        id: number;
        nome: string;
        turma: string;
        disciplina: string;
    };
    resumo: ResumoAluno;
    historico: HistoricoAluno[];
}

interface GraficosAlunoProps {
    resumo: ResumoAluno;
    historico: HistoricoAluno[];
}

export default function GraficosAluno({
    resumo,
    historico,
}: GraficosAlunoProps) {
    return (
        <div className="space-y-6">
            <CardGraficoNotas historico={historico}/>
            <div className="grid gap-6 lg:grid-cols-2">
                <CardGraficoParticipacao historico={historico}/>
                <CardGraficoFrequencia resumo={resumo}/>
            </div>
        </div>
    );
}