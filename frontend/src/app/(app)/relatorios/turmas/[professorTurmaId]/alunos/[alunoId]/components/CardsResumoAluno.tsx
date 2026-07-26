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
            />

            <Card
                titulo="Nota Média"
                valor={
                    resumo.notaMedia !== null
                        ? resumo.notaMedia.toFixed(1)
                        : "-"
                }
            />

            <Card
                titulo="Presenças"
                valor={`${resumo.presencas}/${resumo.totalAulas}`}
            />

            <Card
                titulo="Faltas"
                valor={resumo.faltas.toString()}
            />

            <div className="rounded-xl border-slate-200 bg-white p-5 shadow-sm">
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
}

function Card({ titulo, valor }: CardProps) {
    return (
        <div className="rounded-xl border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
                {titulo}
            </p>

            <p className="mt-3 text-3xl font-bold text-gray-900">
                {valor}
            </p>
        </div>
    );
}