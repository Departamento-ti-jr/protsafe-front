"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ABINavigationBreadcrumb } from "@/components/abi-navigation-breadcrumb"

interface ProcedimentoDetails {
  tipo: string
  codigo: string
  quantidade: number
  valor: number
  descricao: string
}

export default function ProcedimentoDetalhesPage({
  params,
}: {
  params: Promise<{ id: string; atendimentoId: string; procedimentoId: string }>
}) {
  const [abiId, setAbiId] = useState<string>("")
  const [atendimentoId, setAtendimentoId] = useState<string>("")
  const [procedimentoId, setProcedimentoId] = useState<string>("")
  const [procedimento, setProcedimento] = useState<ProcedimentoDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then((resolved) => {
      setAbiId(resolved.id)
      setAtendimentoId(resolved.atendimentoId)
      setProcedimentoId(resolved.procedimentoId)
      fetchProcedimento(resolved.procedimentoId)
    })
  }, [params])

  const fetchProcedimento = async (procedimentoId: string) => {
    try {
      // Simulando dados do procedimento baseado no print
      const mockProcedimento: ProcedimentoDetails = {
        tipo: "P",
        codigo: "0303010010",
        quantidade: 1,
        valor: 431.64,
        descricao: "TRATAMENTO DE DENGUE CLÁSSICA",
      }

      setProcedimento(mockProcedimento)
    } catch (err) {
      console.error("Erro ao carregar procedimento:", err)
    } finally {
      setLoading(false)
    }
  }

  const navigationSteps = [
    { id: "abi", label: "ABI", completed: true, current: false },
    { id: "atendimento", label: "Atendimento", completed: true, current: false },
    { id: "procedimento", label: "Procedimento", completed: false, current: true },
  ]

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (!procedimento) {
    return <div className="p-6 text-red-600">Não foi possível encontrar os dados do procedimento.</div>
  }

  return (
    <div className="flex h-screen">
      <ABINavigationBreadcrumb steps={navigationSteps} />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="flex items-center gap-4">
          <Link href={`/abis/detalhes/${abiId}/atendimento/${atendimentoId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ABI</h1>
            <p className="text-gray-600">Confira os detalhes da "ABI 102"</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Você está visualizando o procedimento "{procedimento.codigo}"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Tipo</p>
                <p className="font-semibold text-lg">{procedimento.tipo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Código</p>
                <p className="font-semibold text-lg">{procedimento.codigo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Quantidade</p>
                <p className="font-semibold text-lg">{procedimento.quantidade}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Valor</p>
                <p className="font-semibold text-lg">
                  R$ {procedimento.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Descrição</p>
              <p className="font-semibold text-lg mt-1">{procedimento.descricao}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
