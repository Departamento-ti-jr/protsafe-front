"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Eye, ArrowLeft, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { use, useEffect, useState } from "react"
import { AbisService } from "@/lib/services/abis.service"
import ProcedimentosTable from "./procedimentos-table"

interface AtendimentoData {
  _id: string
  numeroABI: string
  numeroProcesso: string
  razaoSocial: string
  CNPJ: string
  tipo: string
  competencia: number
  dataRegistroTransacao: string
  descricaoProcedimento: string
  quantidadeProcesso: number
  valorTotalProcesso: number
}

interface ABIAtendimentoDetailsProps {
  atendimento: any
  onBack: () => void
  onViewProcedimento: (procedimento: any) => void
}

export function ABIAtendimentoDetails({ atendimento, onBack, onViewProcedimento }: ABIAtendimentoDetailsProps) {

  const [procedimentos, setProcedimentos] = useState<any[]>([]);

  useEffect(() => {
     console.log("==> ", atendimento);
     console.log("Fetching ABIs for atendimento:", atendimento._id);
     AbisService.getAll({
      codigoBeneficiario: String(atendimento?.codigoBeneficiario),
      abi: atendimento?.numeroABI,
      cnpj: atendimento?.CNPJ,
      page: 1,
      limit: 10
    }).then(response => {
      setProcedimentos(response.data.map(abi => ({
        id: abi._id,
        tipo: abi.tipoProcedimento,
        codigo: abi.codigoProcedimento,
        quantidade: abi.quantidadeProcedimento,
        valor: `R$ ${abi.valorTotalPrestador.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        descricao: abi.descricaoProcedimento
      })))
    }).catch(error => {
      console.error("Error fetching ABIs:", error)
    });
  }, [atendimento])

  const formatCompetencia = (competencia: number) => {
    const competenciaStr = String(competencia).padStart(6, "0")
    return competenciaStr.replace(/^(\d{2})(\d{4})$/, "$1/$2")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4"/>
          </Button>         
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Atendimento {atendimento._id}</h1>
            <p className="text-xs text-gray-600">Confira os detalhes do atendimento "{atendimento.tipo}"</p>
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Você está visualizando o atendimento "{atendimento.tipo}" - ID: {atendimento._id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">ID do Atendimento</p>
              <p className="text-xs font-medium">{atendimento._id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Competência</p>
              <p className="text-xs font-medium">{formatCompetencia(atendimento.competencia)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Valor Total</p>
              <p className="text-xs font-medium">
                R$ {atendimento.valorTotalProcesso.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
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
              <p className="text-xs text-gray-600 mb-1">Tipo</p>
              <p className="text-xs font-medium">{atendimento.tipo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">N° Processo</p>
              <p className="text-xs font-medium">{atendimento.numeroProcesso}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">N° ABI</p>
              <p className="text-xs font-medium">{atendimento.numeroABI}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Data do Registro</p>
              <p className="text-xs font-medium">{formatDate(atendimento.dataRegistroTransacao)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Quantidade de Processos</p>
              <p className="text-xs font-medium">{atendimento.quantidadeProcesso}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Operadora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Razão Social</p>
              <p className="text-xs font-medium">{atendimento.razaoSocial}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">CNPJ</p>
              <p className="text-xs font-medium">{atendimento.CNPJ}</p>
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
              <label className="text-xs text-gray-600 mb-1 block">Observações</label>
              <Textarea placeholder="Se necessário, informe uma observação aqui..." className="text-xs min-h-[60px]" />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Documentos</label>
              <Textarea
                placeholder="Anote aqui os documentos que estão faltando ou se estão completos..."
                className="text-xs min-h-[60px]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">N° Protocolo</label>
              <Textarea placeholder="N° Protocolo da defesa..." className="text-xs min-h-[60px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <ProcedimentosTable 
        procedimentos={procedimentos} 
        onViewProcedimento={onViewProcedimento} 
      />

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
