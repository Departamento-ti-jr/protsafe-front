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

interface ModernSidebarProps {
  className?: string
}

export function ModernSidebar({ className }: ModernSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Empresas",
      href: "/empresas",
      icon: Building2,
    },
    {
      name: "Usuários",
      href: "/usuarios",
      icon: Users,
    },
    {
      name: "Textos de defesa",
      href: "/textos-defesa",
      icon: FileText,
    },
    {
      name: "Documentos comprob.",
      href: "/documentos-comprobatorios",
      icon: FileCheck,
    },
    {
      name: "ABIs",
      href: "/abis",
      icon: FileSpreadsheet,
    },
    {
      name: "Defesas",
      href: "/defesas",
      icon: Shield,
    },
    {
      name: "Recolhimentos",
      href: "/recolhimentos",
      icon: Receipt,
    },
    {
      name: "Logs",
      href: "/logs",
      icon: History,
    },
    {
      name: "Política de Privacidade",
      href: "/politica-privacidade",
      icon: FileTerminal,
    },
  ]

  return (
    <div
      className={cn("w-270 h-screen bg-white border-r border-modernize-gray-200 flex flex-col shadow-lg", className)}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-modernize-gray-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-modernize-primary to-modernize-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-modernize-gray-800">ReSUS</h1>
            <p className="text-xs text-modernize-gray-500">Sistema Jurídico</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <div className="px-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-modernize-gray-400 uppercase tracking-wider mb-3 px-3">
              PRINCIPAL
            </p>
            <nav className="space-y-1">
              {navItems.slice(0, 1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    pathname === item.href
                      ? "bg-gradient-to-r from-modernize-primary to-modernize-secondary text-white shadow-modernize"
                      : "text-modernize-gray-600 hover:bg-modernize-gray-50 hover:text-modernize-primary",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.name}</span>
                  {pathname === item.href && <ChevronRight className="h-4 w-4 opacity-70" />}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-modernize-gray-400 uppercase tracking-wider mb-3 px-3">GESTÃO</p>
            <nav className="space-y-1">
              {navItems.slice(1, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    pathname === item.href
                      ? "bg-gradient-to-r from-modernize-primary to-modernize-secondary text-white shadow-modernize"
                      : "text-modernize-gray-600 hover:bg-modernize-gray-50 hover:text-modernize-primary",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.name}</span>
                  {pathname === item.href && <ChevronRight className="h-4 w-4 opacity-70" />}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-modernize-gray-400 uppercase tracking-wider mb-3 px-3">
              DOCUMENTOS
            </p>
            <nav className="space-y-1">
              {navItems.slice(3, 8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    pathname === item.href
                      ? "bg-gradient-to-r from-modernize-primary to-modernize-secondary text-white shadow-modernize"
                      : "text-modernize-gray-600 hover:bg-modernize-gray-50 hover:text-modernize-primary",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.name}</span>
                  {pathname === item.href && <ChevronRight className="h-4 w-4 opacity-70" />}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold text-modernize-gray-400 uppercase tracking-wider mb-3 px-3">SISTEMA</p>
            <nav className="space-y-1">
              {navItems.slice(8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    pathname === item.href
                      ? "bg-gradient-to-r from-modernize-primary to-modernize-secondary text-white shadow-modernize"
                      : "text-modernize-gray-600 hover:bg-modernize-gray-50 hover:text-modernize-primary",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.name}</span>
                  {pathname === item.href && <ChevronRight className="h-4 w-4 opacity-70" />}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-modernize-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors">
          <LogOut className="h-5 w-5 text-modernize-error" />
          <SignOut onSignOut={handleSignOut} />
        </div>
      </div>
    </div>
  )
}
