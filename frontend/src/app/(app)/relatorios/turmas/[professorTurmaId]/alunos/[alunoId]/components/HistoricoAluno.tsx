import { CheckCircle2, CircleX, MessageSquare } from "lucide-react";

interface AulaAluno {
    aulaId: number;
    data: string;
    assunto: string;
    presenca: boolean;
    participacao: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
    notaAtividade: number | null;
    observacao: string | null;
}

interface HistoricoAlunoProps {
    historico: AulaAluno[];
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

export default function HistoricoAluno({
    historico,
}: HistoricoAlunoProps) {
    return (
        <div className="rounded-xl border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-lg font-semibold">
                Histórico das Aulas
            </h2>

            <div className="rounded-2xl overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                Data
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                Assunto
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                                Presença
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                                Participação
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                                Nota
                            </th>

                            <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                                Obs.
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {historico.map((aula) => (

                            <tr
                                key={aula.aulaId}
                                className="hover:bg-gray-50"
                            >

                                <td className="px-4 py-4">
                                    {new Date(aula.data).toLocaleDateString(
                                        "pt-BR"
                                    )}
                                </td>

                                <td className="px-4 py-4">
                                    {aula.assunto}
                                </td>

                                <td className="px-4 py-4 text-center">

                                    {aula.presenca ? (
                                        <CheckCircle2
                                            className="mx-auto text-green-600"
                                            size={20}
                                        />
                                    ) : (
                                        <CircleX
                                            className="mx-auto text-red-600"
                                            size={20}
                                        />
                                    )}

                                </td>

                                <td className="px-4 py-4 text-center">

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${participacaoCor[aula.participacao]}`}
                                    >
                                        {participacaoTexto[aula.participacao]}
                                    </span>

                                </td>

                                <td className="px-4 py-4 text-center">

                                    {aula.notaAtividade !== null
                                        ? aula.notaAtividade.toFixed(1)
                                        : "-"}

                                </td>

                                <td className="px-4 py-4 text-center">
                                    {aula.observacao ? (
                                        <button
                                            type="button"
                                            title={aula.observacao}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            <MessageSquare size={16} />
                                            Ver
                                        </button>
                                    ) : (
                                        "-"
                                    )}
                                </td>

                            </tr>

                        ))}

                        {historico.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-8 text-center text-gray-500"
                                >
                                    Nenhuma aula encontrada.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}