"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { api } from "../../../../../../services/api";
import { useAuth } from "../../../../../../contexts/AuthContext";

export default function NovaAulaPage() {
    const router = useRouter();
    const params = useParams();

    const { getToken } = useAuth();

    const professorTurmaId = Number(params.id);

    const hoje = new Date().toISOString().split("T")[0];

    const [data, setData] = useState(hoje);
    const [assunto, setAssunto] = useState("");

    const [loading, setLoading] = useState(false);

    async function salvar() {
        if (!assunto.trim()) {
            toast.error("Informe o assunto da aula.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/aulas",
                {
                    professor_turma_id: professorTurmaId,
                    data,
                    assunto,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            toast.success("Aula criada com sucesso!");

            //router.push(`/professor-turma/${professorTurmaId}/aulas`);
            router.push(`/aulas/${response.data.id}/chamada`);
        } catch {
            toast.error("Não foi possível criar a aula.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto">

            <div className="bg-white rounded-xl shadow-md p-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Nova Aula
                </h1>

                <p className="text-gray-500 mb-8">
                    Informe a data e descreva o conteúdo que será ministrado.
                </p>

                <div className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Data
                        </label>

                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                p-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />
                    </div>

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Assunto da Aula
                        </label>

                        <textarea
                            rows={6}
                            value={assunto}
                            onChange={(e) => setAssunto(e.target.value)}
                            placeholder="Descreva o conteúdo que será trabalhado nesta aula..."
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                p-3
                                resize-none
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                        <p className="text-sm text-gray-500 mt-2">
                            Exemplo: Revisão de Equações do 2º Grau,
                            resolução dos exercícios 10 a 20 e introdução ao
                            conceito de funções.
                        </p>

                    </div>

                </div>

                <div className="flex justify-end gap-4 mt-10">

                    <button
                        onClick={() => router.back()}
                        className="
                            px-6
                            py-3
                            rounded-lg
                            border
                            border-gray-300
                            hover:bg-gray-100
                            transition
                            cursor-pointer
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={salvar}
                        disabled={loading}
                        className="
                            px-6
                            py-3
                            rounded-lg
                            bg-blue-600
                            text-white
                            hover:bg-blue-700
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            transition
                            cursor-pointer
                        "
                    >
                        {loading ? "Salvando..." : "Salvar Aula"}
                    </button>

                </div>

            </div>

        </div>
    );
}