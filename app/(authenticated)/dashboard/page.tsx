import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Building2, Shield, TrendingUp, Clock, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema ReSUS</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Defesas Pendentes</CardTitle>
            <Shield className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <p className="text-xs text-green-600 font-medium">+2 desde ontem</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Documentos</CardTitle>
            <FileText className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">145</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <p className="text-xs text-green-600 font-medium">+8 desde ontem</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Usuários</CardTitle>
            <Users className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">9</div>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">Sem alterações</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-600">Empresas</CardTitle>
            <Building2 className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3 text-gray-500" />
              <p className="text-xs text-gray-500 font-medium">Sem alterações</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Clock className="h-5 w-5 text-purple-600" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="border-l-4 border-purple-600 pl-4 pb-4">
              <p className="text-sm font-medium text-gray-900">
                Defesa Nº 0 para o atendimento de Nº 51078 foi inserida
              </p>
              <p className="text-xs text-gray-500 mt-1">Usuário: Camila - 01/05/2025 09:01:24</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 pb-4">
              <p className="text-sm font-medium text-gray-900">Documento comprobatório adicionado</p>
              <p className="text-xs text-gray-500 mt-1">Usuário: Beatriz - 30/04/2025 15:22:10</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4 pb-4">
              <p className="text-sm font-medium text-gray-900">Novo usuário cadastrado</p>
              <p className="text-xs text-gray-500 mt-1">Usuário: Administrador - 29/04/2025 11:05:33</p>
            </div>
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
              Ver todos os logs
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Shield className="h-5 w-5 text-purple-600" />
              Defesas Recentes
            </CardTitle>
            <CardDescription>Últimas defesas elaboradas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="border-l-4 border-green-500 pl-4 pb-4">
              <p className="text-sm font-medium text-gray-900">Defesa #1245 - Operadora CloudMed</p>
              <p className="text-xs text-gray-500 mt-1">Status: Em análise - 01/05/2025</p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4 pb-4">
              <p className="text-sm font-medium text-gray-900">Defesa #1244 - Operadora Juliana Russo</p>
              <p className="text-xs text-gray-500 mt-1">Status: Concluída - 30/04/2025</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4 pb-4">
              <p className="text-sm font-medium text-gray-900">Defesa #1243 - Operadora CloudMed</p>
              <p className="text-xs text-gray-500 mt-1">Status: Concluída - 29/04/2025</p>
            </div>
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
              Ver todas as defesas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
