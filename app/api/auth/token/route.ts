import { getAccessToken, getLogtoContext } from "@logto/next/server-actions"
import { logtoConfig } from "@/app/logto"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { isAuthenticated } = await getLogtoContext(logtoConfig)

    if (isAuthenticated) {
      const token = await getAccessToken(logtoConfig)
      return NextResponse.json({ token, isAuthenticated: true })
    }

    return NextResponse.json({ token: null, isAuthenticated: false })
  } catch (error) {
    console.error("Erro ao obter token:", error)
    return NextResponse.json({ token: null, isAuthenticated: false }, { status: 500 })
  }
}
