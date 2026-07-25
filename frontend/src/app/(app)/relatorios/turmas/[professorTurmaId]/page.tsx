"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "../../../../../services/api";
import { useAuth } from "../../../../../contexts/AuthContext"
import CardsResumo from "./components/CardsResumo";
import GraficoNotas from "./components/GraficoNotas";
import GraficoParticipacao from "./components/GraficoParticipacao";
import TabelaAlunos from "./components/TabelaAlunos";

interface ResumoTurma {
    disciplina: string;
    turma: string;
    professor: string;
    total_alunos: number | null;
    total_aulas: number | null;
    frequencia_media: number | null;
    nota_media: number | null;
}

interface NotasTurma {
    aula_id: number;
    data: Date;
    assunto: string | null;
    nota_media: number | null;
}

export interface ParticipacaoTurma {
    participacao: string;
    quantidade: number;
}

interface AlunoRelatorio {
    aluno_id: number;
    nome: string;
    frequencia: number | null;
    nota_media: number | null;
    participacao_media: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
    alerta: boolean;
}

export default function RelatorioTurmaPage() {
    const params = useParams();
    const professorTurmaId = Number(params.professorTurmaId);

    const { getToken } = useAuth();

    const [resumo, setResumo] = useState<ResumoTurma | null>(null);
    const [notas, setNotas] = useState<NotasTurma[]>([]);
    const [participacao, setParticipacao] = useState<ParticipacaoTurma[]>([]);
    const [alunos, setAlunos] = useState<AlunoRelatorio[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarDados() {
            try {
                setLoading(true);

                const [resumoResponse, notasResponse, participacaoResponse, alunosResponse] = await Promise.all([
                    api.get(`/relatorios/turmas/${professorTurmaId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        }
                    ),
                    api.get(`/relatorios/turmas/${professorTurmaId}/notas`,
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        }
                    ),
                    api.get(`/relatorios/turmas/${professorTurmaId}/participacao`,
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        }
                    ),
                    api.get(`/relatorios/turmas/${professorTurmaId}/alunos`,
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`
                            }
                        }
                    ),
                ]);

                setResumo(resumoResponse.data);
                setNotas(notasResponse.data);
                setParticipacao(participacaoResponse.data);
                setAlunos(alunosResponse.data);
            } catch (error) {
                console.error("Erro ao carregar relatório:", error);
            } finally {
                setLoading(false);
            }
        }

        if (professorTurmaId) {
            carregarDados();
        }
    }, [professorTurmaId]);

    if (loading) {
        return (
            <div className="p-6">
                Carregando...
            </div>
        );
    }

    if (!resumo) {
        return (
            <div className="p-6 text-red-600">
                Não foi possível carregar os dados da turma.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Cabeçalho */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    Relatório da Turma
                </h1>

                <p className="mt-1 text-lg text-slate-600">
                    {resumo.disciplina} • {resumo.turma}
                </p>

                <p className="text-sm text-slate-500">
                    Professor {resumo.professor}
                </p>
            </div>

            {/* Cards */}
            <CardsResumo resumo={resumo} />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <GraficoNotas dados={notas} />
                <GraficoParticipacao dados={participacao} />
            </div>
            <TabelaAlunos professorTurmaId={professorTurmaId} dados={alunos}/>
        </div>
    );
}