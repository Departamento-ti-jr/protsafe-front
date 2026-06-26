import { getAccessToken, getLogtoContext } from "@logto/next/server-actions"
import { logtoConfig } from "@/app/logto"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig)

    if (isAuthenticated) {
      const token = await getAccessToken(logtoConfig)
      return NextResponse.json({ token, isAuthenticated: true, claims })
    }

    return NextResponse.json({ token: null, isAuthenticated: false, claims: null })
  } catch (error) {
    console.error("Erro ao obter token:", error)
    return NextResponse.json({ token: null, isAuthenticated: false, claims: null }, { status: 500 })
  }
}
