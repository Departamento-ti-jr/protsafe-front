import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Building2, Shield, Clock, CheckCircle, ArrowUpRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-modernize-gray-800 mb-2">Dashboard</h1>
        <p className="text-modernize-gray-600">Bem-vindo ao sistema ReSUS</p>
      </div>

      {/* Colorful Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white overflow-hidden relative">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Defesas</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <ArrowUpRight className="h-4 w-4 text-blue-100" />
              <span className="text-blue-100 text-sm">+2 desde ontem</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white overflow-hidden relative">
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

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white overflow-hidden relative">
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

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white overflow-hidden relative">
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
        <Card className="bg-white border-modernize-gray-200 shadow-modernize">
          <CardHeader className="border-b border-modernize-gray-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-modernize-gray-800">
              <div className="w-8 h-8 bg-modernize-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-modernize-primary" />
              </div>
              Atividades Recentes
            </CardTitle>
            <CardDescription className="text-modernize-gray-600">Últimas ações realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-modernize-gray-50">
              <div className="w-2 h-2 bg-modernize-primary rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-modernize-gray-800">
                  Defesa Nº 0 para o atendimento de Nº 51078 foi inserida
                </p>
                <p className="text-xs text-modernize-gray-500 mt-1">Usuário: Camila - 01/05/2025 09:01:24</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-modernize-gray-50">
              <div className="w-2 h-2 bg-modernize-success rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-modernize-gray-800">Documento comprobatório adicionado</p>
                <p className="text-xs text-modernize-gray-500 mt-1">Usuário: Beatriz - 30/04/2025 15:22:10</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-modernize-gray-50">
              <div className="w-2 h-2 bg-modernize-warning rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-modernize-gray-800">Novo usuário cadastrado</p>
                <p className="text-xs text-modernize-gray-500 mt-1">Usuário: Administrador - 29/04/2025 11:05:33</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todos os logs
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-modernize-gray-200 shadow-modernize">
          <CardHeader className="border-b border-modernize-gray-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-modernize-gray-800">
              <div className="w-8 h-8 bg-modernize-success/10 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-modernize-success" />
              </div>
              Defesas Recentes
            </CardTitle>
            <CardDescription className="text-modernize-gray-600">Últimas defesas elaboradas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-modernize-gray-50">
              <div className="w-2 h-2 bg-modernize-success rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-modernize-gray-800">Defesa #1245 - Operadora CloudMed</p>
                <p className="text-xs text-modernize-gray-500 mt-1">Status: Em análise - 01/05/2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-modernize-gray-50">
              <div className="w-2 h-2 bg-modernize-primary rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-modernize-gray-800">Defesa #1244 - Operadora Juliana Russo</p>
                <p className="text-xs text-modernize-gray-500 mt-1">Status: Concluída - 30/04/2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-modernize-gray-50">
              <div className="w-2 h-2 bg-modernize-warning rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-modernize-gray-800">Defesa #1243 - Operadora CloudMed</p>
                <p className="text-xs text-modernize-gray-500 mt-1">Status: Concluída - 29/04/2025</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todas as defesas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
