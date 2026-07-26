"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from "recharts";

import { BarChart3 } from "lucide-react";

interface HistoricoAluno {
    aulaId: number;
    data: string;
    assunto: string;
    presenca: boolean;
    participacao: "ALTA" | "MEDIA" | "BAIXA" | "NAO_INFORMADA";
    notaAtividade: number | null;
    observacao: string | null;
}

interface Props {
    historico: HistoricoAluno[];
}

const CORES = {
    ALTA: "#1d4ed8",
    MEDIA: "#3b82f6",
    BAIXA: "#93c5fd",
};

function TooltipPersonalizado({ active, payload }: any) {
    if (!active || !payload?.length) {
        return null;
    }

    const item = payload[0].payload;

    return (
        <div className="rounded-lg border bg-white p-3 shadow-md">
            <p className="font-semibold">
                Participação {item.nome}
            </p>

            <p className="mt-2 text-blue-600 font-medium">
                {item.quantidade} aula(s)
            </p>
        </div>
    );
}

export default function CardGraficoParticipacao({
    historico,
}: Props) {

    const contagem = {
        ALTA: 0,
        MEDIA: 0,
        BAIXA: 0,
    };

    historico.forEach(item => {

        if (item.participacao === "NAO_INFORMADA") {
            return;
        }

        contagem[item.participacao]++;
    });

    const dados = [
        {
            nome: "Alta",
            quantidade: contagem.ALTA,
            cor: CORES.ALTA,
        },
        {
            nome: "Média",
            quantidade: contagem.MEDIA,
            cor: CORES.MEDIA,
        },
        {
            nome: "Baixa",
            quantidade: contagem.BAIXA,
            cor: CORES.BAIXA,
        },
    ];

    const totalParticipacoes =
        contagem.ALTA +
        contagem.MEDIA +
        contagem.BAIXA;

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-2">

                <BarChart3
                    size={20}
                    className="text-blue-600"
                />

                <div>

                    <h2 className="text-lg font-semibold">
                        Participação
                    </h2>

                    <p className="text-sm text-gray-500">
                        Distribuição das participações registradas.
                    </p>

                </div>

            </div>

            {totalParticipacoes === 0 ? (

                <div className="flex h-72 items-center justify-center text-gray-500">
                    Nenhuma participação registrada.
                </div>

            ) : (

                <div className="h-72">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart
                            data={dados}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 0,
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="nome"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip
                                content={<TooltipPersonalizado />}
                            />

                            <Bar
                                dataKey="quantidade"
                                radius={[8, 8, 0, 0]}
                            >

                                {dados.map((item) => (
                                    <Cell
                                        key={item.nome}
                                        fill={item.cor}
                                    />
                                ))}

                            </Bar>

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>
    );
}