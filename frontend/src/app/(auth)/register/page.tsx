"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { api } from "../../../services/api";

export default function RegisterPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [nome, setNome] = useState("") 
  const perfil = "PROFESSOR"

  async function handleRegister(e: any) {
    e.preventDefault()

    try {
        await api.post("/usuarios", {
            email,
            senha,
            nome,
            perfil
        })

        toast.success("Usuário cadastrado com sucesso!")

        router.push("/login")

    } catch (error: any) {

        if (error.response) {
            toast.error(error.response.data.message)
        } else {
            toast.error("Erro de conexão com o servidor.")
        }
    }
  }

  return (

    <div className="flex items-center justify-center min-h-screen">
        <form
            onSubmit={handleRegister}
            className="bg-gray-100 p-8 rounded-lg shadow-md w-96"
        >
            <h1 className="text-2xl font-bold mb-6 text-center">
                Cadastro
            </h1>

            {/* e-mail */}
            <input
                type="text"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input mb-4"
            />

            {/* Senha */}
            <input
                type="password"
                placeholder="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="input mb-4"
            />

            {/* Nome */}
            <input
                type="text"
                placeholder="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="input mb-4"
            />

            <button
                type="submit"
                className="btn btn-green w-full p-2"
                disabled={(email == '' || senha == '' || nome == '')}
            >
                Cadastrar
            </button>

            {/* Voltar */}
            <p className="text-sm text-center mt-4">
                Já tem conta?{" "}
                <span
                    onClick={() => router.push("/login")}
                    className="text-blue-600 cursor-pointer"
                >
                    Fazer login
                </span>
            </p>
        </form>
    </div>
  )
}