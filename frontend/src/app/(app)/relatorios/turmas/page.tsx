"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { useAuth } from "../../../../contexts/AuthContext"
import {
    Users,
    BookOpen,
    Calendar,
    TriangleAlert,
    ChevronRight
} from "lucide-react";

interface RelatorioTurma {
    professor_turma_id: number;
    turma: string;
    disciplina: string;

    total_alunos: number;
    total_aulas: number;

    presenca_media: number;
    nota_media: number | null;

    alunos_baixa_frequencia: number;
    alunos_abaixo_media: number;

    ultima_aula: string | null;
}

export default function RelatoriosPage() {

    const router = useRouter();
    const { getToken } = useAuth()

    const [turmas, setTurmas] = useState<RelatorioTurma[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadRelatorios() {
        try {

            const response = await api.get("/relatorios/turmas",
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            setTurmas(response.data);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRelatorios();
    }, []);

    function formatDate(data: string | null) {

        if (!data) return "-";

        return new Date(data).toLocaleDateString("pt-BR");

    }

    function statusColor(presenca: number, nota: number | null) {

        if (presenca >= 90 && (nota ?? 10) >= 8)
            return "border-green-500";

        if (presenca >= 75 && (nota ?? 6) >= 6)
            return "border-yellow-400";

        return "border-red-500";

    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-8">
                Carregando...
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto p-8 space-y-8">

            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h1 className="text-3xl font-bold text-slate-800">
                    Relatórios
                </h1>
                <p className="text-slate-500 mt-2">
                    Acompanhe os indicadores de desempenho das suas turmas.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {turmas.map((turma) => (
                    <div
                        key={turma.professor_turma_id}
                        className={`bg-white rounded-2xl shadow-sm border-l-4 ${statusColor(
                            turma.presenca_media,
                            turma.nota_media
                        )} p-6 hover:shadow-lg transition`}
                    >
                        <h2 className="text-xl font-bold text-slate-800">
                            {turma.turma}
                        </h2>

                        <p className="text-slate-500 mb-6">
                            {turma.disciplina}
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Users size={18} />
                                <span>
                                    {turma.total_alunos} alunos
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <BookOpen size={18} />
                                <span>
                                    {turma.total_aulas} aulas
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-5">
                                <span>Presença média (%)</span>
                                <span className="font-semibold text-green-700">
                                    {turma.presenca_media?.toFixed(1) ?? 0}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>Nota média</span>
                                <span className="font-semibold text-blue-700">
                                    {turma.nota_media?.toFixed(1) ?? "-"}
                                </span>
                            </div>

                            <hr className="my-4" />

                            <div className="flex items-center gap-3 text-amber-600">
                                <TriangleAlert size={18} />
                                <span>
                                    {turma.alunos_baixa_frequencia}
                                    {" "}aluno(s) com baixa frequência
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-red-600">
                                <TriangleAlert size={18} />
                                <span>
                                    {turma.alunos_abaixo_media}
                                    {" "}aluno(s) abaixo da média
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mt-4 text-slate-500">
                                <Calendar size={18} />
                                Última aula:
                                {formatDate(turma.ultima_aula)}
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                router.push(
                                    `/relatorios/${turma.professor_turma_id}`
                                )
                            }
                            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium transition"
                        >
                            Ver relatório
                            <ChevronRight size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}