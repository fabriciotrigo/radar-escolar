'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from "../../../../../contexts/AuthContext";
import { api } from '../../../../../services/api';
import { toast } from 'react-toastify';

interface AulaResumoDTO {
    aula_id: number;
    data: string;
    assunto: string;
    percentual_presenca: number;
    participacao_media: string;
    nota_media: number | null;
}

interface LoadAulasResponseDTO {
    data: AulaResumoDTO[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function AulasPage() {

    const { getToken } = useAuth()

    const router = useRouter();
    const params = useParams();

    const professorTurmaId = Number(params.id);

    const [loading, setLoading] = useState(true);
    const [aulas, setAulas] = useState<AulaResumoDTO[]>([]);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadAulas();
    }, [page]);

    async function loadAulas() {

        setLoading(true);

        try {
            const response = await api.get<LoadAulasResponseDTO>(
                `/professor-turma/${professorTurmaId}/aulas`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    },
                    params: {
                        page,
                        limit
                    }
                }
            );

            setAulas(response.data.data);
            setTotal(response.data.total);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar as aulas.");
        } finally {
            setLoading(false);
        }
    }

    function abrirChamada(aulaId: number) {
        router.push(`/aulas/${aulaId}/chamada`);
    }

    function novaAula() {
        router.push(`/professor-turma/${professorTurmaId}/aulas/novo`);
    }

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8 rounded-2xl bg-white shadow-sm p-5">
                <div>
                    <h1 className="text-3xl font-bold">
                        Minhas Aulas
                    </h1>

                    <p className="text-gray-600 mt-1">
                        Total de aulas: {total}
                    </p>
                </div>

                <button
                    onClick={novaAula}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                    Nova Aula
                </button>
            </div>

            {loading ? (

                <div className="text-center py-12">
                    Carregando...
                </div>

            ) : (

                <>
                    <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        Data
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Assunto
                                    </th>

                                    <th className="px-4 py-3 text-center">
                                        % Presença
                                    </th>

                                    <th className="px-4 py-3 text-center">
                                        Participação Média
                                    </th>

                                    <th className="px-4 py-3 text-center">
                                        Nota Média
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {aulas.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-8"
                                        >
                                            Nenhuma aula cadastrada.
                                        </td>
                                    </tr>

                                ) : (
                                    aulas.map((aula) => (
                                        <tr
                                            key={aula.aula_id}
                                            onClick={() => abrirChamada(aula.aula_id)}
                                            className="border-t hover:bg-blue-50 cursor-pointer transition-colors"
                                        >
                                            <td className="px-4 py-3">
                                                {new Date(aula.data).toLocaleDateString('pt-BR')}
                                            </td>

                                            <td className="px-4 py-3">
                                                {aula.assunto}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {aula.percentual_presenca}%
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {aula.participacao_media}
                                            </td>

                                            <td className="px-4 py-3 text-center">
                                                {aula.nota_media ?? "-"}
                                            </td>
                                        </tr>
                                    ))

                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ← Anterior
                        </button>

                        <div className="text-gray-700">
                            Página <strong>{page}</strong> de{" "}
                            <strong>{totalPages}</strong>
                        </div>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Próxima →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}