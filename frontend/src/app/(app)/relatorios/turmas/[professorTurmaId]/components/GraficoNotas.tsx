"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import { TrendingUp } from "lucide-react"

interface NotasTurma {
    aula_id: number;
    data: Date;
    assunto: string | null;
    nota_media: number | null;
}

interface GraficoNotasProps {
    dados: NotasTurma[];
}

function formatarData(data: string) {
    return new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
    });
}

function TooltipPersonalizado({ active, payload }: any) {
    if (!active || !payload?.length) {
        return null;
    }

    const aula = payload[0].payload;

    return (
        <div className="rounded-lg border bg-white p-3 shadow-md">
            <p className="font-semibold">
                {formatarData(aula.data)}
            </p>

            <p className="mt-2 text-sm text-gray-700">
                {aula.assunto}
            </p>

            <p className="mt-2 font-medium text-blue-600">
                Nota da Turma:{" "}
                {aula.nota_media !== null
                    ? aula.nota_media.toFixed(1)
                    : "-"}
            </p>
        </div>
    );
}

export default function GraficoNotas({
    dados,
}: GraficoNotasProps) {
    return (
        <div className="rounded-xl border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
                <TrendingUp
                    size={20}
                    className="text-blue-600"
                />
                <h2 className="text-lg font-semibold">
                    Evolução da Nota Média da Turma por Aula
                </h2>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={dados}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="data"
                            tickFormatter={formatarData}
                        />

                        <YAxis
                            domain={[0, 10]}
                            ticks={[0, 2, 4, 6, 8, 10]}
                        />

                        <Tooltip
                            content={<TooltipPersonalizado />}
                        />

                        <Line
                            type="monotone"
                            dataKey="nota_media"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{
                                r: 5,
                            }}
                            activeDot={{
                                r: 7,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}