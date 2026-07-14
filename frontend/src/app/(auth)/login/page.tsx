"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from 'react-toastify';
import { useAuth } from "../../../contexts/AuthContext"
import { api } from "../../../services/api";

export default function LoginPage() {
  
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function handleLogin(e: any) {
    e.preventDefault()

    try {
        const response = await api.post("/usuarios/signin", {
            email,
            senha
        })

        login(response.data.token)

        toast.success("Login realizado com sucesso!", {
            position: "top-center",
            closeOnClick: true
        })

        router.push("/dashboard")
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.message, {
                position: "top-center",
                closeOnClick: true
            })
        } else {
            toast.error("Erro de conexão com o servidor.", {
                position: "top-center",
                closeOnClick: true
            })
        }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    
      <form
        onSubmit={handleLogin}
        className="bg-gray-100 p-8 rounded-lg shadow-md w-96"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <Image src="/vercel.svg"
            alt="Logo"
            width={300}
            height={300} 
          />
        </div>

        <input
          type="text"
          placeholder="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input" 
        />
        <input
          type="password"
          placeholder="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="input" 
        />

        <button
          type="submit"
          className="btn btn-blue w-full p-2"
          disabled={(email == '' || senha == '')}
        >
          Entrar
        </button>

        <p className="text-sm text-center mt-4">
          Não tem conta?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Cadastre-se
          </span>
        </p>

      </form>
    </div>
  )
}