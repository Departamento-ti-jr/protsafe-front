"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { formatDateToDDMMYYYY } from "@/lib/date-helpers"
import { AbisService } from "@/lib/services/abis.service"
import type { Atendimento } from "@/lib/services/atendimentos.service"
import { useAbiDetails } from "../../hooks/use-abi-details"
import { ABINavigationBreadcrumb } from "../components/abi-navigation-breadcrumb"
import { ABIAtendimentoDetails } from "../components/abi-atendimento-details"
import { ABIProcedimentoDetails } from "../components/abi-procedimento-details"
import { AtendimentosTable } from "../components/abi-atendimentos-table"

type ViewMode = "abi" | "atendimento" | "procedimento"
type AtendimentoDetalhado = Atendimento;

export default function ABIDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const router = useRouter()

  const [viewMode, setViewMode] = useState<ViewMode>("abi")
  const [selectedAtendimento, setSelectedAtendimento] = useState<Atendimento | null>(null)
  const [selectedProcedimento, setSelectedProcedimento] = useState<any>(null)

  const {
    abi,
    abiLoading,
    error,
    atendimentos,
    atendimentosLoading,
    searchTerm,
    handleSearch,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    refetchAtendimentos,
  } = useAbiDetails(id, { initialPageSize: 5 })

  const breadcrumbStep = useMemo(() => viewMode, [viewMode])

  const handleViewAtendimento = (atendimento: AtendimentoDetalhado) => {
    atendimento.abi = abi ?? undefined; 
    setSelectedAtendimento(atendimento)
    setViewMode("atendimento")
  }

  const handleViewProcedimento = (procedimento: any) => {
    setSelectedProcedimento(procedimento)
    setViewMode("procedimento")
  }

  const handleBackToAbi = () => {
    setSelectedAtendimento(null)
    setSelectedProcedimento(null)
    setViewMode("abi")
  }

  const handleBackToAtendimento = () => {
    setSelectedProcedimento(null)
    setViewMode("atendimento")
  }

  const handleNewDefender = (idAtendimento: string) => {
    router.push(`/defesas/nova/${idAtendimento}`)
  }

  const handleEditDefender = (defenceId: string) => {
    router.push(`/defesas/editar/${defenceId}`)
  }

  const handleMarkAsSemDefesa = async (atendimentoId: string) => {
    try {
      await AbisService.markAsSemDefesa(atendimentoId)
      refetchAtendimentos()
    } catch (err) {
      console.error(err)
      alert("Erro ao marcar como sem defesa.")
    }
  }

  if (abiLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Carregando ABI...</div>
  }

  if (error || !abi) {
    return <div className="p-6 text-sm text-red-600">{error || "Não foi possível carregar a ABI."}</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ABINavigationBreadcrumb
        currentStep={breadcrumbStep}
        abiId={id}
        atendimentoId={selectedAtendimento?._id ?? selectedAtendimento?.id?.toString()}
        procedimentoId={selectedProcedimento?.id}
        onNavigateToAbi={handleBackToAbi}
        onNavigateToAtendimento={selectedAtendimento ? handleBackToAtendimento : undefined}
      />

      <div className="flex-1 p-6 space-y-6">
        {viewMode === "abi" && (
          <>
            <div className="flex items-center gap-4">
              <Link href="/abis">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <div>
                <h1 className="text-2xl font-bold">ABI {abi.numeroAbi}</h1>
                <p className="text-sm text-gray-600">Detalhes da ABI {abi.numeroAbi}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detalhes da ABI</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Número da ABI</p>
                  <p className="font-semibold">{abi.numeroAbi}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Número Processo</p>
                  <p className="font-mono">{abi.numeroProcesso}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Operadora</p>
                  <p>{abi?.operadora?.razaoSocial}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">CNPJ</p>
                  <p>{abi?.operadora?.cnpj}</p>
                </div>
              </CardContent>
            </Card>

            <AtendimentosTable
              searchTerm={searchTerm}
              onSearch={handleSearch}
              loading={atendimentosLoading}
              paginatedData={atendimentos}
              currentPage={pagination.page}
              pageSize={pagination.pageSize}
              formatDate={formatDateToDDMMYYYY}
              onEditDefender={handleEditDefender}
              onCreateDefender={handleNewDefender}
              onMarkAsSemDefesa={handleMarkAsSemDefesa}
              onViewAtendimento={handleViewAtendimento}
            />

            <PaginationControls
              currentPage={Number(atendimentos.page)}
              totalPages={Number(atendimentos.totalPages)}
              pageSize={atendimentos.pageSize}
              totalItems={atendimentos.total}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}

        {viewMode === "atendimento" && selectedAtendimento && (
          <ABIAtendimentoDetails
            atendimento={selectedAtendimento}
            onBack={handleBackToAbi}
            onViewProcedimento={handleViewProcedimento}
          />
        )}

        {viewMode === "procedimento" && selectedProcedimento && (
          <ABIProcedimentoDetails procedimento={selectedProcedimento} onBack={handleBackToAtendimento} />
        )}
      </div>
    </div>
  )
}
