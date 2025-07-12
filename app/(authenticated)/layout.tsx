import type React from "react"
import { ModernSidebar } from "@/components/modern-sidebar"
import { ModernHeader } from "@/components/modern-header"
import { getLogtoContext, getAccessToken } from "@logto/next/server-actions"
import { redirect } from "next/navigation"
import { logtoConfig } from "../logto"
import { checkUserPermissions } from "@/lib/auth-permissions"

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = await getLogtoContext(logtoConfig)

  if (!isAuthenticated) {
    redirect("/")
  }

  // Verificar permissões do usuário
  try {
    const token = await getAccessToken(logtoConfig)

    if (token) {
      const { hasPermission } = await checkUserPermissions(token)

      if (!hasPermission) {
        redirect("/sem-permissao")
      }
    } else {
      // Se não conseguir obter o token, redireciona para login
      redirect("/")
    }
  } catch (error) {
    console.error("Erro ao verificar permissões:", error)
    redirect("/sem-permissao")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModernSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ModernHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
