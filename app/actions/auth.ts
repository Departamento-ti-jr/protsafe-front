"use server"

import { signIn, signOut, getLogtoContext, getAccessToken } from "@logto/next/server-actions"
import { logtoConfig } from "../logto"
import { checkUserPermissions } from "@/lib/auth-permissions"

export async function handleSignIn() {
  await signIn(logtoConfig)
}

export async function handleSignOut() {
  await signOut(logtoConfig)
}

export async function getAuthToken() {
  try {
    const { isAuthenticated } = await getLogtoContext(logtoConfig)

    if (isAuthenticated) {
      const token = await getAccessToken(logtoConfig)
      return { token, isAuthenticated: true }
    }

    return { token: null, isAuthenticated: false }
  } catch (error) {
    console.error("Erro ao obter token:", error)
    return { token: null, isAuthenticated: false }
  }
}

export async function verifyUserAccess() {
  try {
    const { isAuthenticated } = await getLogtoContext(logtoConfig)

    if (!isAuthenticated) {
      return { hasAccess: false, error: "Usuário não autenticado" }
    }

    const token = await getAccessToken(logtoConfig)

    if (!token) {
      return { hasAccess: false, error: "Token não encontrado" }
    }

    const { hasPermission, error } = await checkUserPermissions(token)

    return {
      hasAccess: hasPermission,
      error: error || (hasPermission ? null : "Sem permissão"),
      token,
    }
  } catch (error) {
    console.error("Erro ao verificar acesso do usuário:", error)
    return { hasAccess: false, error: "Erro interno" }
  }
}
