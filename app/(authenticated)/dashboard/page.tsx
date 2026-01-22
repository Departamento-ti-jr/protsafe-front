"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Building2, Shield, Clock, CheckCircle, ArrowUpRight } from "lucide-react"
import { useSocketEvent } from "@/src/socket/useSocketEvent"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Dashboard</h1>
      </div>

      {/* Colorful Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-[#09989d] to-[#0bb8bf] border-0 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm font-medium mb-1">Defesas</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <ArrowUpRight className="h-4 w-4 text-teal-100" />
              <span className="text-teal-100 text-sm">+2 desde ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#059669] to-[#10b981] border-0 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium mb-1">Documentos</p>
                <p className="text-3xl font-bold">145</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <ArrowUpRight className="h-4 w-4 text-emerald-100" />
              <span className="text-emerald-100 text-sm">+8 desde ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#d97706] to-[#f59e0b] border-0 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Usuários</p>
                <p className="text-3xl font-bold">9</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <CheckCircle className="h-4 w-4 text-orange-100" />
              <span className="text-orange-100 text-sm">Sem alterações</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-0 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Empresas</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <CheckCircle className="h-4 w-4 text-purple-100" />
              <span className="text-purple-100 text-sm">Sem alterações</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white border-slate-200 shadow-modernize">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <div className="w-8 h-8 bg-[#09989d]/10 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#09989d]" />
              </div>
              Atividades Recentes
            </CardTitle>
            <CardDescription className="text-slate-600">Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-2 h-2 bg-[#09989d] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">
                  Defesa Nº 0 para o atendimento de Nº 51078 foi inserida
                </p>
                <p className="text-xs text-slate-500 mt-1">Usuário: Camila - 01/05/2025 09:01:24</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-2 h-2 bg-[#059669] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Documento comprobatório adicionado</p>
                <p className="text-xs text-slate-500 mt-1">Usuário: Beatriz - 30/04/2025 15:22:10</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-2 h-2 bg-[#d97706] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Novo usuário cadastrado</p>
                <p className="text-xs text-slate-500 mt-1">Usuário: Administrador - 29/04/2025 11:05:33</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Ver todos os logs
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-modernize">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <div className="w-8 h-8 bg-[#059669]/10 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-[#059669]" />
              </div>
              Defesas Recentes
            </CardTitle>
            <CardDescription className="text-slate-600">Últimas defesas elaboradas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-2 h-2 bg-[#059669] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Defesa #1245 - Operadora CloudMed</p>
                <p className="text-xs text-slate-500 mt-1">Status: Em análise - 01/05/2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-2 h-2 bg-[#09989d] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Defesa #1244 - Operadora Juliana Russo</p>
                <p className="text-xs text-slate-500 mt-1">Status: Concluída - 30/04/2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-2 h-2 bg-[#d97706] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Defesa #1243 - Operadora CloudMed</p>
                <p className="text-xs text-slate-500 mt-1">Status: Concluída - 29/04/2025</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Ver todas as defesas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
