"use client"

import { useState, useEffect } from "react"

interface AuthState {
  token: string | null
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Recupera o token do localStorage ao inicializar
    const token = localStorage.getItem("resus_auth_token")
    if (token) {
      setAuthState({
        token,
        isAuthenticated: true,
      })
    }
  }, [])

  const setToken = (token: string) => {
    localStorage.setItem("resus_auth_token", token)
    setAuthState({
      token,
      isAuthenticated: true,
    })
  }

  const removeToken = () => {
    localStorage.removeItem("resus_auth_token")
    setAuthState({
      token: null,
      isAuthenticated: false,
    })
  }

  const getToken = () => {
    return localStorage.getItem("resus_auth_token")
  }

  return {
    ...authState,
    setToken,
    removeToken,
    getToken,
  }
}
