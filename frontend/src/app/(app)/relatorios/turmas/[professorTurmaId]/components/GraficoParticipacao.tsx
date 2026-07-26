"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import { BarChart3 } from "lucide-react";

interface ParticipacaoTurma {
    participacao: string;
    quantidade: number;
}

interface GraficoParticipacaoProps {
    dados: ParticipacaoTurma[];
}

export default function GraficoParticipacao({
    dados,
}: GraficoParticipacaoProps) {
    const dadosGrafico = dados.map((item) => ({
        participacao:
            item.participacao === "ALTA"
                ? "Alta"
                : item.participacao === "MEDIA"
                ? "Média"
                : item.participacao === "BAIXA"
                ? "Baixa"
                : "N/I",

        quantidade: item.quantidade,
    }));

    return (
        <div className="rounded-xl border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
                <BarChart3
                    size={20}
                    className="text-blue-600"
                />
                <h2 className="text-lg font-semibold">
                    Participação da Turma por Aula
                </h2>
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart
                    data={dadosGrafico}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="participacao" />

                    <YAxis allowDecimals={false} />

                    <Tooltip
                        formatter={(value) => [
                            value,
                            "Quantidade",
                        ]}
                    />

                    <Bar
                        dataKey="quantidade"
                        radius={[8, 8, 0, 0]}
                        fill="#2563eb"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}