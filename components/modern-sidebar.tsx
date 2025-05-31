"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <div className={cn("w-64 h-screen bg-white border-r border-gray-200 flex flex-col", className)}>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Image src="/images/resus-logo.jpeg" alt="Resus Logo" width={120} height={40} className="object-contain" />
        </div>
        <p className="text-sm text-gray-500 mt-2">Painel de Controle</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <div className="px-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4 px-3">Navegação Principal</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 text-gray-600 hover:text-red-600 justify-start"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  )
}
