"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import {
    LayoutDashboard,
    GraduationCap,
    LogOut
} from "lucide-react";

export default function Sidebar() {

    const pathname = usePathname();
    const router = useRouter();

    const { logout } = useAuth();
    const { user } = useAuth();

    function menuClass(paths: string | string[]) {

        const lista = Array.isArray(paths) ? paths : [paths];

        const active = lista.some(path => pathname.startsWith(path));

        return `
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            font-medium
            transition-all
            duration-200
            ${
                active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-blue-700"
            }
        `;
    }

    function sair() {
        logout();
        router.push("/login");
    }

    return (

        <aside
            className="
                m-4
                w-72
                rounded-2xl
                bg-white
                shadow-lg
                flex
                flex-col
            "
        >

            {/* Logo */}

            <div className="p-4">
                <div
                    className="
                        rounded-2xl
                        bg-blue-600
                        py-6
                        text-center
                        shadow-sm
                    "
                >
                    <h2 className="text-2xl font-bold text-white">
                        Radar Escolar
                    </h2>

                    <p className="mt-1 text-sm text-blue-100">
                        Olá, {user?.nome}
                    </p>
                </div>
            </div>

            {/* Menu */}

            <div className="px-4">
                <nav
                    className="
                        rounded-2xl
                        bg-slate-50
                        p-3
                        shadow-sm
                        space-y-2
                    "
                >
                    <Link
                        href="/dashboard"
                        className={menuClass([
                            "/dashboard",
                            "/professor-turma",
                            "/aulas"
                        ])}
                    >
                        <LayoutDashboard size={20} />
                        Minhas Turmas
                    </Link>

                    <Link
                        href="/relatorios/turmas"
                        className={menuClass("/relatorios")}
                    >
                        <GraduationCap size={20} />
                        Relatórios
                    </Link>
                </nav>
            </div>

            {/* Espaço */}

            <div className="flex-1" />

            {/* Rodapé */}

            <div className="p-4">
                <div
                    className="
                        rounded-2xl
                        bg-slate-50
                        p-3
                        shadow-sm
                    "
                >
                    <button
                        onClick={sair}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-red-600
                            transition-all
                            duration-200
                            hover:bg-red-50
                            hover:text-red-700
                            cursor-pointer
                        "
                    >
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </div>
        </aside>
    );
}