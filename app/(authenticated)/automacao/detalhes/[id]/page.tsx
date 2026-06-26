import AutomacaoDetalhesPage from "./_components/AutomacaoDetalhesPage"
import { getAccessToken } from "@logto/next/server-actions"
import { logtoConfig } from "../../../../logto"
import { checkUserPermissions } from "@/lib/auth-permissions"

export default async function AutomacaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await (params)

  const token = await getAccessToken(logtoConfig)
  const { roles } = await checkUserPermissions(token)
  const isAdmin = roles?.includes("Super-Admin")

  return (
    <div className="min-h-screen bg-slate-50/50">
       <AutomacaoDetalhesPage id={id} isAdmin={isAdmin} />
    </div>
  )
}
