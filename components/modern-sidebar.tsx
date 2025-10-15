"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  FileCheck,
  FileSpreadsheet,
  Shield,
  Receipt,
  History,
  FileTerminal,
  LogOut,
  ChevronRight,
} from "lucide-react"
import SignOut from "@/components/sign-out"
import { handleSignOut } from "@/app/actions/auth"
import { disabledRoutes } from "@/app/config/disabled-routes"

interface ModernSidebarProps {
  className?: string
}

export function ModernSidebar({ className }: ModernSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Empresas", href: "/empresas", icon: Building2 },
    { name: "Usuários", href: "/usuarios", icon: Users },
    { name: "Textos de defesa", href: "/textos-defesa", icon: FileText },
    { name: "Documentos comprob.", href: "/documentos-comprobatorios", icon: FileCheck },
    { name: "ABIs", href: "/abis", icon: FileSpreadsheet },
    { name: "Defesas", href: "/defesas", icon: Shield },
    { name: "Recolhimentos", href: "/recolhimentos", icon: Receipt },
    { name: "Logs", href: "/logs", icon: History },
    { name: "Política de Privacidade", href: "/politica-privacidade", icon: FileTerminal },
  ].map((item) => ({
    ...item,
    disabled: disabledRoutes.includes(item.href),
  }))

  const renderNavLink = (item: any) => {
    const isActive = pathname === item.href
    const commonClasses =
      "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative"

    if (item.disabled) {
      return (
        <div
          key={item.href}
          className={cn(commonClasses, "text-slate-400 cursor-not-allowed opacity-60")}
          title="Em breve" // opcional: tooltip
        >
          <item.icon className="h-5 w-5" />
          <span className="flex-1">{item.name}</span>
        </div>
      )
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          commonClasses,
          isActive
            ? "bg-gradient-to-r from-[#09989d] to-[#0bb8bf] text-white shadow-modernize"
            : "text-slate-600 hover:bg-slate-50 hover:text-[#09989d]"
        )}
      >
        <item.icon className="h-5 w-5" />
        <span className="flex-1">{item.name}</span>
        {isActive && <ChevronRight className="h-4 w-4 opacity-70" />}
      </Link>
    )
  }

  return (
    <div
      className={cn(
        "w-270 h-screen bg-gradient-to-b from-[#09989d]/10 to-[#0bb8bf]/5 border-r border-slate-200 flex flex-col shadow-lg",
        className
      )}
    >
      {/* Logo */}
      <div className="p-3 border-b border-slate-100">
        <Link href="/dashboard" className="gap-3 justify-items-center block">
          <img src="/images/logo_menu.png" alt="ProtSafe Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Navegação */}
      <div className="flex-1 py-6">
        <div className="px-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
              PRINCIPAL
            </p>
            <nav className="space-y-1">{navItems.slice(0, 1).map(renderNavLink)}</nav>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
              GESTÃO
            </p>
            <nav className="space-y-1">{navItems.slice(1, 3).map(renderNavLink)}</nav>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
              DOCUMENTOS
            </p>
            <nav className="space-y-1">{navItems.slice(3, 8).map(renderNavLink)}</nav>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
              SISTEMA
            </p>
            <nav className="space-y-1">{navItems.slice(8).map(renderNavLink)}</nav>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors">
          <LogOut className="h-5 w-5 text-red-500" />
          <SignOut onSignOut={handleSignOut} />
        </div>
      </div>
    </div>
  )
}
