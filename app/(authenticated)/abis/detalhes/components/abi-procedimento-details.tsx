"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"

interface ProcedimentoData {
  id: string
  tipo: string
  codigo: string
  quantidade: string
  valorTotal: string
  descricao: string
}

interface ABIProcedimentoDetailsProps {
  procedimento: ProcedimentoData
  onBack: () => void
}

export function ABIProcedimentoDetails({ procedimento, onBack }: ABIProcedimentoDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4"/>
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Procedimento</h1>
            <p className="text-xs text-gray-600">Confira os detalhes do procedimento "{procedimento.codigo}"</p>
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Você está visualizando o procedimento "{procedimento.codigo}"
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tipo</p>
              <p className="text-xs font-medium">{procedimento.tipo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Código</p>
              <p className="text-xs font-medium">{procedimento.codigo}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Quantidade</p>
              <p className="text-xs font-medium">{procedimento.quantidade}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Valor</p>
              <p className="text-xs font-medium">{procedimento.valorTotal}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-1">Descrição</p>
            <p className="text-xs font-medium">{procedimento.descricao}</p>
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
  )
}
