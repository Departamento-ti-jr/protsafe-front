import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Eye, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { ABINavigationBreadcrumb } from "@/components/abi-navigation-breadcrumb"

interface AtendimentoDetalhesPageProps {
  params: {
    id: string
    atendimentoId: string
  }
}

// Mock data - substituir por dados reais da API
const mockAtendimentoData = {
  id: "1",
  numeroOrdem: "1",
  competencia: "042024",
  valorTotal: "R$ 431,64",
  tipo: "AIH",
  numeroAtendimento: "322410319515",
  caraterAtendimento: "2",
  dataInicial: "01-01-0001",
  dataFinal: "14-03-2024",
  beneficiario: {
    codigo: "000000000000000000001003971608",
    codigoCCO: "060935737209",
    dataNascimento: "03-02-1977",
  },
  procedimentos: [
    {
      id: "1",
      tipo: "P",
      codigo: "0303010010",
      quantidade: "1",
      valor: "R$ 431,64",
      descricao: "TRATAMENTO DE DENGUE CLÁSSICA",
    },
  ],
}

export default function AtendimentoDetalhesPage({ params }: AtendimentoDetalhesPageProps) {
  return (
    <div className="flex min-h-screen bg-modernize-gray-50">
      <ABINavigationBreadcrumb currentStep="atendimento" abiId={params.id} atendimentoId={params.atendimentoId} />

      <div className="flex-1 p-4">
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Link href={`/abis/detalhes/${params.id}`}>
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

        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Você está visualizando o atendimento "AIH" de "N° 1"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">N° Ordem</p>
                <p className="text-xs font-medium">{mockAtendimentoData.numeroOrdem}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Competência</p>
                <p className="text-xs font-medium">{mockAtendimentoData.competencia}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Valor Total</p>
                <p className="text-xs font-medium">{mockAtendimentoData.valorTotal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Atendimento identificado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Tipo</p>
                <p className="text-xs font-medium">{mockAtendimentoData.tipo}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">N° Atendimento</p>
                <p className="text-xs font-medium">{mockAtendimentoData.numeroAtendimento}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Caráter Atendimento</p>
                <p className="text-xs font-medium">{mockAtendimentoData.caraterAtendimento}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Data Inicial</p>
                <p className="text-xs font-medium">{mockAtendimentoData.dataInicial}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Data Fim</p>
                <p className="text-xs font-medium">{mockAtendimentoData.dataFinal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Beneficiário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Código</p>
                <p className="text-xs font-medium">{mockAtendimentoData.beneficiario.codigo}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Código CCO</p>
                <p className="text-xs font-medium">{mockAtendimentoData.beneficiario.codigoCCO}</p>
              </div>
              <div>
                <p className="text-xs text-modernize-gray-600 mb-1">Data Nascimento</p>
                <p className="text-xs font-medium">{mockAtendimentoData.beneficiario.dataNascimento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Informações para Controle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-modernize-gray-600 mb-1 block">Observações</label>
                <Textarea
                  placeholder="Se necessário, informe uma observação aqui..."
                  className="text-xs min-h-[60px]"
                />
              </div>
              <div>
                <label className="text-xs text-modernize-gray-600 mb-1 block">Documentos</label>
                <Textarea
                  placeholder="Anote aqui os documentos que estão faltando ou se estão completos..."
                  className="text-xs min-h-[60px]"
                />
              </div>
              <div>
                <label className="text-xs text-modernize-gray-600 mb-1 block">N° Protocolo</label>
                <Textarea placeholder="N° Protocolo da defesa..." className="text-xs min-h-[60px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Procedimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-modernize-gray-200">
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Tipo</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Código</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Quantidade</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Valor</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Descrição</th>
                    <th className="text-left py-2 px-2 text-xs font-medium text-modernize-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAtendimentoData.procedimentos.map((procedimento) => (
                    <tr key={procedimento.id} className="border-b border-modernize-gray-100 hover:bg-modernize-gray-50">
                      <td className="py-2 px-2 text-xs">{procedimento.tipo}</td>
                      <td className="py-2 px-2 text-xs">{procedimento.codigo}</td>
                      <td className="py-2 px-2 text-xs">{procedimento.quantidade}</td>
                      <td className="py-2 px-2 text-xs">{procedimento.valor}</td>
                      <td className="py-2 px-2 text-xs">{procedimento.descricao}</td>
                      <td className="py-2 px-2">
                        <Link
                          href={`/abis/detalhes/${params.id}/atendimento/${params.atendimentoId}/procedimento/${procedimento.id}`}
                        >
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

        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" className="text-xs bg-transparent">
            <Save className="w-3 h-3 mr-1" />
            Salvar
          </Button>
          <Button size="sm" className="text-xs">
            <Save className="w-3 h-3 mr-1" />
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
