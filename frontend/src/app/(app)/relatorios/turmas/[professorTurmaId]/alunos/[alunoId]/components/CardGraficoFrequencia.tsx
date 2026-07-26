"use client";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

import { PieChart as PieChartIcon } from "lucide-react";

interface ResumoAluno {
    frequencia: number;
    notaMedia: number | null;
    participacaoMedia:
        | "ALTA"
        | "MEDIA"
        | "BAIXA"
        | "NAO_INFORMADA";
    totalAulas: number;
    presencas: number;
    faltas: number;
    alerta: boolean;
}

interface Props {
    resumo: ResumoAluno;
}

function TooltipPersonalizado({ active, payload }: any) {
    if (!active || !payload?.length) {
        return null;
    }

    const item = payload[0].payload;

    return (
        <div className="rounded-lg border bg-white p-3 shadow-md">
            <p className="font-semibold">{item.name}</p>

            <p className="mt-2 text-blue-600 font-medium">
                {item.value} aula(s)
            </p>

            <p className="text-sm text-gray-600">
                {item.percentual.toFixed(1)}%
            </p>
        </div>
    );
}

export default function CardGraficoFrequencia({
    resumo,
}: Props) {

    const dados = [
        {
            name: "Presenças",
            value: resumo.presencas,
            percentual:
                resumo.totalAulas === 0
                    ? 0
                    : (resumo.presencas / resumo.totalAulas) * 100,
            color: "#1d4ed8",
        },
        {
            name: "Faltas",
            value: resumo.faltas,
            percentual:
                resumo.totalAulas === 0
                    ? 0
                    : (resumo.faltas / resumo.totalAulas) * 100,
            color: "#93c5fd",
        },
    ];

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-2">

                <PieChartIcon
                    size={20}
                    className="text-blue-600"
                />

                <div>

                    <h2 className="text-lg font-semibold">
                        Frequência
                    </h2>

                    <p className="text-sm text-gray-500">
                        Distribuição entre presenças e faltas.
                    </p>

                </div>

            </div>

            {resumo.totalAulas === 0 ? (

                <div className="flex h-72 items-center justify-center text-gray-500">
                    Nenhuma aula registrada.
                </div>

            ) : (

                <div className="h-72">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={dados}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                            >

                                {dados.map((item) => (
                                    <Cell
                                        key={item.name}
                                        fill={item.color}
                                    />
                                ))}

                            </Pie>

                            <Tooltip
                                content={<TooltipPersonalizado />}
                            />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            )}

        </div>
    );
}