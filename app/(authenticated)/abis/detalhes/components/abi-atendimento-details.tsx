"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import type { Atendimento } from "@/lib/services/atendimentos.service"
import ProcedimentosTable from "./procedimentos-table"
import { useProcedimentosRelacionados } from "../hooks/use-procedimentos-relacionados"

interface ABIAtendimentoDetailsProps {
  atendimento: Atendimento
  onBack: () => void
  onViewProcedimento: (procedimento: any) => void
}

const DetailItem = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div>
    <p className="text-xs text-gray-600 mb-1">{label}</p>
    <p className="text-xs font-medium">{value ?? "—"}</p>
  </div>
)

const formatCompetencia = (competencia?: number | string | null) => {
  if (!competencia) return "—"
  const normalized = String(competencia).padStart(6, "0")
  return normalized.replace(/^(\d{2})(\d{4})$/, "$1/$2")
}

const formatDate = (value?: string | null) => {
  if (!value) return "—"
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime())
    ? "—"
    : parsed.toLocaleDateString("pt-BR")
}

export function ABIAtendimentoDetails({
  atendimento,
  onBack,
  onViewProcedimento,
}: ABIAtendimentoDetailsProps) {
  const { procedimentos, loading } = useProcedimentosRelacionados(atendimento)

  const headerTitle = useMemo(
    () => `Atendimento ${atendimento.id ?? atendimento.id ?? ""}`,
    [atendimento.id, atendimento.id]
  )

  const atendimentoInfo = useMemo(
    () => [
      { label: "Tipo", value: atendimento.tipo },
      { label: "N° Processo", value: atendimento.abi?.numeroProcesso ?? '' },
      {
        label: "N° ABI",
        value: atendimento.abi?.numeroAbi ?? ''
      },
      {
        label: "Data do Registro",
        value: formatDate(atendimento.dataRegistroTransacao),
      },
      {
        label: "Quantidade de Processos",
        value: atendimento.quantidadeProcesso,
      },
    ],
    [atendimento]
  )

  const operadoraInfo = useMemo(
    () => [
      { label: "Registro ANS", value: atendimento.abi?.operadora?.registroAns },
      { label: "Razão Social", value: atendimento.abi?.operadora?.razaoSocial },
      { label: "CNPJ", value: atendimento.abi?.operadora?.cnpj },
    ],
    [atendimento.abi?.operadora?.razaoSocial, atendimento.abi?.operadora?.cnpj]
  )

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{headerTitle}</h1>
            <p className="text-xs text-gray-600">
              Confira os detalhes do atendimento "{atendimento.tipo}"
            </p>
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Você está visualizando o atendimento "{atendimento.tipo}" - ID: {atendimento.id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <DetailItem label="ID do Atendimento" value={atendimento.id ?? atendimento.id} />
            <DetailItem label="Competência" value={formatCompetencia(atendimento.competencia)} />
            <DetailItem label="Valor Total" value={atendimento.valorTotal ? `R$ ${Number(atendimento.valorTotal).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Atendimento identificado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {atendimentoInfo.slice(0, 3).map(({ label, value }) => (
              <DetailItem key={label} label={label} value={value} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {atendimentoInfo.slice(3).map(({ label, value }) => (
              <DetailItem key={label} label={label} value={value} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Operadora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {operadoraInfo.map(({ label, value }) => (
              <DetailItem key={label} label={label} value={value} />
            ))}
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
        isLoading={loading}
        onViewProcedimento={onViewProcedimento}
      />
    </div>
  )
}
