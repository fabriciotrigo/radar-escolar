"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

type Participacao = "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";

interface AlunoChamadaDTO {
    aluno_id: number;
    nome: string;
    presenca: boolean;
    participacao: Participacao;
    nota_atividade: number | null;
    observacao: string | null;
}

interface LoadChamadaResponseDTO {
    aula_id: number;
    data: string;
    assunto: string;
    alunos: AlunoChamadaDTO[];
}

export default function ChamadaPage() {

    const { id } = useParams();
    const router = useRouter();
    const { getToken } = useAuth();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [aulaId, setAulaId] = useState(0);
    const [data, setData] = useState("");
    const [assunto, setAssunto] = useState("");

    const [alunos, setAlunos] = useState<AlunoChamadaDTO[]>([]);

    useEffect(() => {
        loadChamada();
    }, []);

    async function loadChamada() {

        try {

            const response = await api.get<LoadChamadaResponseDTO>(
                `/aulas/${id}/chamada`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            setAulaId(response.data.aula_id);
            setData(response.data.data);
            setAssunto(response.data.assunto);
            setAlunos(response.data.alunos);

        } catch (error) {

            console.error(error);
            toast.error("Erro ao carregar chamada.");

        } finally {

            setLoading(false);

        }

    }

    function updateAluno(
        alunoId: number,
        campo: keyof AlunoChamadaDTO,
        valor: any
    ) {

        setAlunos(old =>
            old.map(aluno =>
                aluno.aluno_id === alunoId
                    ? { ...aluno, [campo]: valor }
                    : aluno
            )
        );

    }

    async function salvar() {

        try {

            setSaving(true);

            await api.put(
                `/aulas/${aulaId}/chamada`,
                alunos,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            toast.success("Chamada salva com sucesso!");

            router.back();

        } catch (error) {

            console.error(error);
            toast.error("Erro ao salvar chamada.");

        } finally {

            setSaving(false);

        }

    }

    if (loading) {
        return (
            <div className="text-center py-12">
                Carregando...
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto p-8 space-y-4">

            {/* Cabeçalho */}

            <div className="rounded-2xl bg-white shadow-sm p-5">

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Lista de Presença
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-2">
                    <div>
                        <label className="block mb-2 font-semibold">
                            Data da Aula
                        </label>

                        <input
                            disabled
                            value={new Date(data).toLocaleDateString("pt-BR")}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                py-2
                            "
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">
                            Assunto
                        </label>

                        <input
                            disabled
                            value={assunto}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                py-2
                            "
                        />

                    </div>

                </div>

            </div>

            {/* Tabela */}

            <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 w-16 text-center">
                                #
                            </th>

                            <th className="px-4 py-3 text-left">
                                Aluno
                            </th>

                            <th className="px-4 py-3 w-32 text-center">
                                Presença
                            </th>

                            <th className="px-4 py-3 w-56 text-center">
                                Participação
                            </th>

                            <th className="px-4 py-3 w-36 text-center">
                                Nota
                            </th>

                            <th className="px-4 py-3">
                                Observação
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">

                        {alunos.map((aluno, index) => (

                            <tr
                                key={aluno.aluno_id}
                                className={`
                                    transition-all
                                    hover:bg-blue-50
                                    ${!aluno.presenca ? "bg-red-50/70" : ""}
                                `}
                            >

                                <td className="px-4 py-3 text-center text-slate-500">
                                    {index + 1}
                                </td>

                                <td className="px-4 py-3 font-medium">
                                    {aluno.nome}
                                </td>

                                <td className="px-4 py-3 text-center">

                                    <input
                                        type="checkbox"
                                        checked={aluno.presenca}
                                        onChange={(e) =>
                                            updateAluno(
                                                aluno.aluno_id,
                                                "presenca",
                                                e.target.checked
                                            )
                                        }
                                        className="
                                            h-5
                                            w-5
                                            accent-blue-600
                                            cursor-pointer
                                        "
                                    />

                                </td>

                                <td className="px-4 py-3">

                                    <select
                                        value={aluno.participacao}
                                        onChange={(e) =>
                                            updateAluno(
                                                aluno.aluno_id,
                                                "participacao",
                                                e.target.value as Participacao
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            px-3
                                            py-2
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-100
                                            outline-none
                                        "
                                    >
                                        <option value="ALTA">Alta</option>
                                        <option value="MEDIA">Média</option>
                                        <option value="BAIXA">Baixa</option>
                                        <option value="NAO_INFORMADA">
                                            Não Informada
                                        </option>
                                    </select>

                                </td>

                                <td className="px-4 py-3">

                                    <input
                                        type="number"
                                        min={0}
                                        max={10}
                                        step={0.5}
                                        value={aluno.nota_atividade ?? ""}
                                        onChange={(e) =>
                                            updateAluno(
                                                aluno.aluno_id,
                                                "nota_atividade",
                                                e.target.value === ""
                                                    ? null
                                                    : Number(e.target.value)
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            text-center
                                            px-3
                                            py-2
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-100
                                            outline-none
                                        "
                                    />

                                </td>

                                <td className="px-4 py-3">

                                    <input
                                        type="text"
                                        value={aluno.observacao ?? ""}
                                        onChange={(e) =>
                                            updateAluno(
                                                aluno.aluno_id,
                                                "observacao",
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-200
                                            px-3
                                            py-2
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-100
                                            outline-none
                                        "
                                    />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Rodapé */}

            {/*<div className="rounded-2xl bg-white shadow-sm p-5"*/}
            <div className="sticky bottom-0 rounded-2xl bg-white shadow-sm p-5
                    border-t border-slate-200 px-6 py-4 flex justify-end gap-3
                "
            >
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => router.back()}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-slate-200
                            hover:bg-slate-300
                            transition
                        "
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={salvar}
                        disabled={saving}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-700
                            disabled:bg-blue-300
                            text-white
                            transition
                        "
                    >
                        {saving ? "Salvando..." : "Salvar Chamada"}
                    </button>
                </div>
            </div>
        </div>
    );
}