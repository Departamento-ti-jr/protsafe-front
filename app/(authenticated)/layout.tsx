import type React from "react"
import { ModernSidebar } from "@/components/modern-sidebar"
import { ModernHeader } from "@/components/modern-header"
import { getLogtoContext } from "@logto/next/server-actions"
import { redirect } from "next/navigation"
import { logtoConfig } from "../logto"

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = await getLogtoContext(logtoConfig)

  if (!isAuthenticated) {
    redirect("/")
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
