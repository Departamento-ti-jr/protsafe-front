"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"

interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  setToken: (token: string) => void
  removeToken: () => void
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Verifica se há um token do Logto e salva no localStorage
    const checkLogtoToken = async () => {
      try {
        const response = await fetch("/api/auth/token")
        if (response.ok) {
          const data = await response.json()
          if (data.token && !auth.token) {
            auth.setToken(data.token)
          }
        }
      } catch (error) {
        console.error("Erro ao verificar token do Logto:", error)
      } finally {
        setIsInitialized(true)
      }
    }

    checkLogtoToken()
  }, [])

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
