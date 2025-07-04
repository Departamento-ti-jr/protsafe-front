"use server"

import { signIn, signOut, getLogtoContext, getAccessToken } from "@logto/next/server-actions"
import { logtoConfig } from "../logto"
import { log } from "console"

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
