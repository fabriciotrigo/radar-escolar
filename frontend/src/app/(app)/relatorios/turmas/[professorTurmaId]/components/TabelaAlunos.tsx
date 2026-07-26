"use client";

import Link from "next/link";
import { TriangleAlert, Eye } from "lucide-react";

interface AlunoRelatorio {
    aluno_id: number;
    nome: string;
    frequencia: number | null;
    nota_media: number | null;
    participacao_media: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
    alerta: boolean;
}

interface TabelaAlunosProps {
    professorTurmaId: number;
    dados: AlunoRelatorio[];
}

const participacaoBadge = {
    ALTA: "bg-green-100 text-green-700",
    MEDIA: "bg-yellow-100 text-yellow-700",
    BAIXA: "bg-red-100 text-red-700",
    NAO_INFORMADA: "bg-gray-100 text-gray-700",
};

const participacaoTexto = {
    ALTA: "Alta",
    MEDIA: "Média",
    BAIXA: "Baixa",
    NAO_INFORMADA: "N/I",
};

export default function TabelaAlunos({
    professorTurmaId,
    dados,
}: TabelaAlunosProps) {
    return (
        <div className="rounded-xl border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
                Alunos da Turma
            </h2>

            <div className="rounded-2xl overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Aluno
                            </th>

                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Frequência
                            </th>

                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Nota Média
                            </th>

                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Participação
                            </th>

                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {dados.map((aluno) => (
                            <tr
                                key={aluno.aluno_id}
                                className={
                                    aluno.alerta
                                        ? "bg-red-50 transition-colors hover:bg-red-100"
                                        : "transition-colors hover:bg-gray-50"
                                }
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {aluno.alerta && (
                                            <TriangleAlert
                                                className="h-4 w-4 text-red-600"
                                                strokeWidth={2.5}
                                            />
                                        )}

                                        <span className="font-medium text-gray-900">
                                            {aluno.nome}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-center text-gray-700">
                                    {aluno.frequencia}%
                                </td>

                                <td className="px-6 py-4 text-center text-gray-700">
                                    {aluno.nota_media !== null
                                        ? aluno.nota_media.toFixed(1)
                                        : "-"}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${participacaoBadge[aluno.participacao_media]}`}
                                    >
                                        {
                                            participacaoTexto[
                                                aluno.participacao_media
                                            ]
                                        }
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <Link
                                        href={`/relatorios/turmas/${professorTurmaId}/alunos/${aluno.aluno_id}`}
                                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        <Eye size={16} />
                                        Visualizar
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        {dados.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-8 text-center text-gray-500"
                                >
                                    Nenhum aluno encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}