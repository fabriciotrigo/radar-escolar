"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "../../../services/api"
import { useAuth } from "../../../contexts/AuthContext"

type Dashboard = {
    professor_turma_id: number
    turma_id: number
    ano: number
    sala: string
    disciplina: string
    quantidade_alunos: number
}

export default function DashboardPage() {

    const router = useRouter()
    const { getToken } = useAuth()

    const [turmas, setTurmas] = useState<Dashboard[]>([])

    useEffect(() => {

        async function loadDashboard() {

            try {
                const response = await api.get("/professor-turma/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${getToken()}`
                        }
                    }
                )

                setTurmas(response.data)

            } catch (error) {
                console.error(error)
            }
        }

        loadDashboard()

    }, [])

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Suas turmas
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {turmas.map((turma) => (

                    <div
                        key={turma.professor_turma_id}
                        onClick={() =>
                            router.push(
                                `/professor-turma/${turma.professor_turma_id}/aulas`
                            )
                        }
                        className="
                            bg-white
                            rounded-xl
                            shadow-md
                            p-5
                            cursor-pointer
                            hover:shadow-xl
                            hover:scale-105
                            transition
                        "
                    >
                        <h2 className="text-2xl font-bold text-cyan-600">
                            {turma.ano}º {turma.sala}
                        </h2>

                        <p className="text-gray-700 mt-3">
                            {turma.disciplina}
                        </p>

                        <p className="text-gray-500 mt-2">
                            {turma.quantidade_alunos} alunos
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}