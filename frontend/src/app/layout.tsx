import type { Metadata } from "next";
import { AuthProvider } from "../contexts/AuthContext"
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radar Escolar",
  description: "FIAP - Hackaton Fase 5",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body>
                <AuthProvider>
                    {children}
                    <ToastContainer/>
                </AuthProvider>
            </body>
        </html>
    )
}
