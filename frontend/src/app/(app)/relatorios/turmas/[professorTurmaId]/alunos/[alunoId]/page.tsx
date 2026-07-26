"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { api } from "@/services/api";
import { useAuth } from "../../../../../../../contexts/AuthContext"

import CardsResumoAluno from "./components/CardsResumoAluno";
import HistoricoAluno from "./components/HistoricoAluno";
import GraficosAluno from "./components/GraficosAluno"

interface RelatorioAluno {
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

    historico: {
        aulaId: number;
        data: string;
        assunto: string;
        presenca: boolean;
        participacao: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
        notaAtividade: number | null;
        observacao: string | null;
    }[];
}

export default function RelatorioAlunoPage() {
    const router = useRouter();
    const { getToken } = useAuth();
    console.log(`***Olá teste ${api.defaults.baseURL}***`);
    const { professorTurmaId, alunoId } = useParams<{
        professorTurmaId: string;
        alunoId: string;
    }>();

    const [loading, setLoading] = useState(true);
    const [relatorio, setRelatorio] = useState<RelatorioAluno | null>(null);

    useEffect(() => {
        async function carregarRelatorio() {
            try {
                setLoading(true);
                const response = await api.get(
                    `/relatorios/turmas/${professorTurmaId}/alunos/${alunoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    }
                );

                setRelatorio(response.data);
            } catch (error) {
                console.error("Erro ao carregar relatório:", error);
            /*} catch (error: any) {
                console.log(error.response?.status);
                console.log(error.response?.data);
                console.log(error.config?.url);*/
            } finally {
                setLoading(false);
            }
        }

        if (professorTurmaId && alunoId) {
            carregarRelatorio();
        }
    }, [professorTurmaId, alunoId]);

    if (loading) {
        return (
            <div className="p-6">
                Carregando...
            </div>
        );
    }

    if (!relatorio) {
        return (
            <p className="text-center text-gray-500">
                Relatório não encontrado.
            </p>
        );
    }

    return (
        <div className="space-y-6">

            <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700 cursor-pointer"
            >
                <ArrowLeft size={18} />
                Voltar para Relatório da Turma
            </button>

            <header>
                <h1 className="text-3xl font-bold text-gray-900">
                    Relatório do Aluno
                </h1>

                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {relatorio.aluno.nome}
                    </h2>

                    <p className="mt-1 text-gray-500">
                        {relatorio.aluno.disciplina} • {relatorio.aluno.turma}
                    </p>
                </div>
            </header>

            {relatorio.resumo.alerta && (
                <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    <TriangleAlert className="h-5 w-5 shrink-0" />
                    <span>
                        Este aluno apresenta indicadores que merecem atenção.
                    </span>
                </div>
            )}

            <CardsResumoAluno resumo={relatorio.resumo} />
            <GraficosAluno
                resumo={relatorio.resumo}
                historico={relatorio.historico}
            />
            <HistoricoAluno historico={relatorio.historico} />

        </div>
    );
}