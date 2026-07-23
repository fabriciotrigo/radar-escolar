"use client"

import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    const router = useRouter();

    useEffect(() => {

        if (!loading && !isAuthenticated) {
            router.replace("/login");
        }

    }, [loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Carregando...
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        /*<div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>
        </div>*/
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}