"use client"

import { useState } from "react"
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
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

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
      name: "Documentos comprobatórios",
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
      name: "Automação",
      href: "/automacao",
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
      name: "Política de Privacidade e Termo de Uso",
      href: "/politica-privacidade",
      icon: FileTerminal,
    },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-gradient-to-b from-resus-secondary via-resus-dark to-resus-secondary text-white transition-all duration-300 shadow-2xl",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-resus-primary/20 bg-gradient-to-r from-resus-primary/10 to-transparent">
        {!collapsed && (
          <h1 className="text-2xl font-bold bg-gradient-to-r from-resus-primary to-white bg-clip-text text-transparent">
            <Link href="/dashboard">ReSUS</Link>
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-resus-primary hover:bg-[#69ded8]/20 hover:text-white transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 group relative overflow-hidden",
                  pathname === item.href
                    ? "bg-gradient-to-r from-resus-primary to-resus-accent text-resus-secondary shadow-lg transform scale-105"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-resus-primary/20 hover:to-resus-accent/20 hover:text-white hover:transform hover:scale-105",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-all duration-200",
                    pathname === item.href ? "text-resus-secondary" : "text-resus-primary group-hover:text-white",
                  )}
                />
                {!collapsed && (
                  <span
                    className={cn(
                      "font-medium transition-all duration-200",
                      pathname === item.href ? "text-resus-secondary" : "",
                    )}
                  >
                    {item.name}
                  </span>
                )}
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-resus-primary/20 to-resus-accent/20 rounded-xl blur-sm -z-10" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-resus-primary/20 bg-gradient-to-r from-resus-primary/5 to-transparent">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-white transition-all duration-200 rounded-xl",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Sair</span>}
        </Button>
      </div>
    </div>
  )
}
