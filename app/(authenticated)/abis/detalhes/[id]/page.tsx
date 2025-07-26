import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Eye, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { ABINavigationBreadcrumb } from "@/components/abi-navigation-breadcrumb"

interface ABIDetalhesPageProps {
  params: {
    id: string
  }
}

// Mock data - substituir por dados reais da API
const mockABIData = {
  id: "102",
  numeroOficio: "33910028558/2025-11",
  numeroProcesso: "940",
  nomeOperadora: "SAMP ESPIRITO SANTO ASSISTENCIA MEDICA SA.",
  cnpj: "02.403.281/0001-59",
  dataHoraRegistro: "27-06-2025",
  registroANS: "342033",
  status: "Aberto",
  quantidadeProcessos: "1417",
  valorTotal: "R$ 2.676.023,20",
}

const mockAtendimentos = [
  {
    id: "1",
    ordem: "1",
    tipo: "AIH",
    numeroProcesso: "33910028558/2025-11",
    numeroAtendimento: "322410319515",
    competencia: "042024",
    dataInicial: "13-03-2024",
    dataFinal: "14-03-2024",
    procedimentoPrincipal: "TRATAMENTO DE DENGUE CLÁSSICA",
    status: "Aberto",
  },
  {
    id: "2",
    ordem: "2",
    tipo: "AIH",
    numeroProcesso: "33910028558/2025-11",
    numeroAtendimento: "322410319691",
    competencia: "042024",
    dataInicial: "23-03-2024",
    dataFinal: "26-03-2024",
    procedimentoPrincipal: "TRATAMENTO DE DENGUE CLÁSSICA",
    status: "Aberto",
  },
  {
    id: "3",
    ordem: "3",
    tipo: "AIH",
    numeroProcesso: "33910028558/2025-11",
    numeroAtendimento: "322410320615",
    competencia: "052024",
    dataInicial: "17-04-2024",
    dataFinal: "19-04-2024",
    procedimentoPrincipal: "TRATAMENTO DE DENGUE CLÁSSICA",
    status: "Aberto",
  },
  {
    id: "4",
    ordem: "4",
    tipo: "AIH",
    numeroProcesso: "33910028558/2025-11",
    numeroAtendimento: "322410386569",
    competencia: "042024",
    dataInicial: "15-04-2024",
    dataFinal: "17-04-2024",
    procedimentoPrincipal: "PARTO NORMAL",
    status: "Defendido",
  },
]

export default function ABIDetalhesPage({ params }: ABIDetalhesPageProps) {
  return (
    <div className="flex min-h-screen bg-modernize-gray-50">
      <ABINavigationBreadcrumb currentStep="abi" abiId={params.id} />

      <div className="flex-1 p-4">
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Link href="/abis">
              <Button variant="ghost" size="sm" className="p-1">
                <ArrowLeft className="w-3 h-3" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-modernize-gray-900">ABI</h1>
              <p className="text-xs text-modernize-gray-600">Confira os detalhes da "ABI {mockABIData.id}"</p>
            </div>
          </div>
        </div>

        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Você está visualizando a "ABI {mockABIData.id}"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Número da ABI</p>
                <p className="text-xs font-medium">{mockABIData.id}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Número do processo</p>
                <p className="text-xs font-medium">{mockABIData.numeroProcesso}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Número do ofício</p>
                <p className="text-xs font-medium">{mockABIData.numeroOficio}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Nome da operadora</p>
                <p className="text-xs font-medium">{mockABIData.nomeOperadora}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">CNPJ</p>
                <p className="text-xs font-medium">{mockABIData.cnpj}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Data / Hora registro da transação</p>
                <p className="text-xs font-medium">{mockABIData.dataHoraRegistro}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Registro ANS</p>
                <p className="text-xs font-medium">{mockABIData.registroANS}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Status</p>
                <Badge variant="secondary" className="text-xs">
                  {mockABIData.status}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Quantidade de processos</p>
                <p className="text-xs font-medium">{mockABIData.quantidadeProcessos}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Valor total dos processos</p>
                <p className="text-xs font-medium">{mockABIData.valorTotal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Atendimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-3 w-3 text-modernize-gray-400" />
                <Input
                  placeholder="Difícil de encontrar? Digite aqui que vamos encontrar para você..."
                  className="pl-8 text-xs h-8"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-modernize-gray-200">
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">N° Ordem</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Tipo</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">N° Processo</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">N° Atendimento</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Competência</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Data Inicial</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Data Final</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">
                      Procedimento Principal
                    </th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Status</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAtendimentos.map((atendimento) => (
                    <tr key={atendimento.id} className="border-b border-modernize-gray-100 hover:bg-modernize-gray-50">
                      <td className="py-2 px-2 text-xs">{atendimento.ordem}</td>
                      <td className="py-2 px-2 text-xs">{atendimento.tipo}</td>
                      <td className="py-2 px-2 text-xs">{atendimento.numeroProcesso}</td>
                      <td className="py-2 px-2 text-xs">{atendimento.numeroAtendimento}</td>
                      <td className="py-2 px-2 text-xs">{atendimento.competencia}</td>
                      <td className="py-2 px-2 text-xs">{atendimento.dataInicial}</td>
                      <td className="py-2 px-2 text-xs">{atendimento.dataFinal}</td>
                      <td className="py-2 px-2 text-xs">{atendimento.procedimentoPrincipal}</td>
                      <td className="py-2 px-2">
                        <Badge variant={atendimento.status === "Aberto" ? "secondary" : "default"} className="text-xs">
                          {atendimento.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-2">
                        <Link href={`/abis/detalhes/${params.id}/atendimento/${atendimento.id}`}>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
