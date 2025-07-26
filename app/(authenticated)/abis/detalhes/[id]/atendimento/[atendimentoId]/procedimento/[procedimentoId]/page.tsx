import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ABINavigationBreadcrumb } from "@/components/abi-navigation-breadcrumb"

interface ProcedimentoDetalhesPageProps {
  params: {
    id: string
    atendimentoId: string
    procedimentoId: string
  }
}

// Mock data - substituir por dados reais da API
const mockProcedimentoData = {
  id: "1",
  codigo: "0303010010",
  tipo: "P",
  quantidade: "1",
  valor: "R$ 431,64",
  descricao: "TRATAMENTO DE DENGUE CLÁSSICA",
}

export default function ProcedimentoDetalhesPage({ params }: ProcedimentoDetalhesPageProps) {
  return (
    <div className="flex min-h-screen bg-modernize-gray-50">
      <ABINavigationBreadcrumb
        currentStep="procedimento"
        abiId={params.id}
        atendimentoId={params.atendimentoId}
        procedimentoId={params.procedimentoId}
      />

      <div className="flex-1 p-4">
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Link href={`/abis/detalhes/${params.id}/atendimento/${params.atendimentoId}`}>
              <Button variant="ghost" size="sm" className="p-1">
                <ArrowLeft className="w-3 h-3" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-modernize-gray-900">ABI</h1>
              <p className="text-xs text-modernize-gray-600">Confira os detalhes da "ABI 102"</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Você está visualizando o procedimento "{mockProcedimentoData.codigo}"
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Tipo</p>
                <p className="text-xs font-medium">{mockProcedimentoData.tipo}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Código</p>
                <p className="text-xs font-medium">{mockProcedimentoData.codigo}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Quantidade</p>
                <p className="text-xs font-medium">{mockProcedimentoData.quantidade}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Valor</p>
                <p className="text-xs font-medium">{mockProcedimentoData.valor}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-modernize-gray-600 mb-1">Descrição</p>
              <p className="text-xs font-medium">{mockProcedimentoData.descricao}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
