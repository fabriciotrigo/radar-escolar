interface ResumoAluno {
    frequencia: number;
    notaMedia: number | null;
    participacaoMedia: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
    totalAulas: number;
    presencas: number;
    faltas: number;
    alerta: boolean;
}

interface CardsResumoAlunoProps {
    resumo: ResumoAluno;
}

const participacaoTexto = {
    ALTA: "Alta",
    MEDIA: "Média",
    BAIXA: "Baixa",
    NAO_INFORMADA: "N/I",
};

const participacaoCor = {
    ALTA: "bg-green-100 text-green-700",
    MEDIA: "bg-yellow-100 text-yellow-700",
    BAIXA: "bg-red-100 text-red-700",
    NAO_INFORMADA: "bg-gray-100 text-gray-700",
};

export default function CardsResumoAluno({
    resumo,
}: CardsResumoAlunoProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            <Card
                titulo="Frequência"
                valor={`${resumo.frequencia}%`}
                corBorda={getCorBordaFrequencia(resumo.frequencia)}
            />
            <Card
                titulo="Presenças"
                valor={`${resumo.presencas}/${resumo.totalAulas}`}
            />
            <Card
                titulo="Faltas"
                valor={resumo.faltas.toString()}
            />
            <Card
                titulo="Nota Média"
                valor={
                    resumo.notaMedia !== null
                        ? resumo.notaMedia.toFixed(1)
                        : "-"
                }
                corBorda={getCorBordaNota(resumo.notaMedia)}
            />

            <div className={`rounded-xl border-l-4 ${getCorBordaParticipacao(resumo.participacaoMedia)} bg-white p-5 shadow-sm`}>
                <p className="text-sm text-gray-500">
                    Participação
                </p>

                <div className="mt-4">
                    <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${participacaoCor[resumo.participacaoMedia]}`}
                    >
                        {participacaoTexto[resumo.participacaoMedia]}
                    </span>
                </div>
            </div>

        </div>
    );
}

interface CardProps {
    titulo: string;
    valor: string;
    corBorda?: string;
}

function Card({ titulo, valor, corBorda = "border-slate-200" }: CardProps) {
    return (
        <div className={`rounded-xl border-l-4 ${corBorda} bg-white p-5 shadow-sm`}>
            <p className="text-sm text-gray-500">
                {titulo}
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
                {valor}
            </p>
        </div>
    );
}

function getCorBordaFrequencia(frequencia: number) {
    if (frequencia >= 90) {
        return "border-green-500";
    }

    if (frequencia >= 75) {
        return "border-yellow-400";
    }

    return "border-red-500";
}

function getCorBordaNota(nota: number | null) {
    if (nota === null) {
        return "border-slate-200";
    }

    if (nota >= 8) {
        return "border-green-500";
    }

    if (nota >= 6) {
        return "border-yellow-400";
    }

    return "border-red-500";
}

type Participacao = ResumoAluno["participacaoMedia"];

function getCorBordaParticipacao(participacao: Participacao) {
    if (participacao === "ALTA") {
        return "border-green-500";
    }

    if (participacao === "MEDIA") {
        return "border-yellow-400";
    }

    if (participacao === "BAIXA") {
        return "border-red-500";
    }

    return "border-slate-200";
}