"use client";

import {
    Users,
    CalendarDays,
    ClipboardCheck,
    Star,
} from "lucide-react";

interface ResumoTurma {
    total_alunos: number | null;
    total_aulas: number | null;
    frequencia_media: number | null;
    nota_media: number | null;
}

interface CardsResumoProps {
    resumo: ResumoTurma;
}

export default function CardsResumo({
    resumo,
}: CardsResumoProps) {

    const cards = [
        {
            titulo: "Alunos",
            valor: resumo.total_alunos,
            icone: Users,
            cor: "bg-blue-100 text-blue-600",
        },
        {
            titulo: "Aulas",
            valor: resumo.total_aulas,
            icone: CalendarDays,
            cor: "bg-indigo-100 text-indigo-600",
        },
        {
            titulo: "Frequência Média",
            valor: `${resumo.frequencia_media}%`,
            icone: ClipboardCheck,
            cor: "bg-emerald-100 text-emerald-600",
        },
        {
            titulo: "Nota Média",
            valor: typeof resumo.nota_media === "number"
                        ? resumo.nota_media.toFixed(1)
                        : "-",
            icone: Star,
            cor: "bg-amber-100 text-amber-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icone;

                return (
                    <div
                        key={card.titulo}
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            p-5
                            shadow-sm
                            transition-all
                            hover:shadow-md
                        "
                    >
                        <div>
                            <p className="text-sm text-slate-500">
                                {card.titulo}
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-800">
                                {card.valor}
                            </p>
                        </div>

                        <div
                            className={`
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                ${card.cor}
                            `}
                        >
                            <Icon size={24} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}