"use client"

import React, { useEffect, useState } from "react"
import { PaginationControls, type PaginatedResponse } from "@/components/ui/pagination-controls"
import { ComposicaoDadosAnsService, type ComposicaoDadosAbiRegistro } from "@/lib/services/composicao-dados-ans.service"
import { ComposicaoAbiHeader } from "./_components/ComposicaoAbiHeader"
import { ComposicaoAbiDetailsCard } from "./_components/ComposicaoAbiDetailsCard"
import { ComposicaoAtendimentosTable } from "./_components/ComposicaoAtendimentosTable"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const createEmptyResponse = (): PaginatedResponse<ComposicaoDadosAbiRegistro> => ({
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 1,
})

export default function AutomacaoDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [registros, setRegistros] = useState<PaginatedResponse<ComposicaoDadosAbiRegistro>>(createEmptyResponse)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [processing, setProcessing] = useState(false)
  const [processError, setProcessError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await ComposicaoDadosAnsService.getRegistrosByAbiId(id, { page, pageSize })
        setRegistros(response)
        setError(null)
        setSelectedIds([])
      } catch (err) {
        setError("Erro ao carregar registros da ABI.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, page, pageSize])

  const toggleId = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleAllCurrent = (ids: string[]) => {
    if (ids.length === 0) return
    const allSelected = ids.every((id) => selectedIds.includes(id))
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)))
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])))
    }
  }

  const handleProcessSelected = async () => {
    if (selectedIds.length === 0) return
    const numericIds = selectedIds.map((id) => Number(id)).filter((n) => !Number.isNaN(n))
    if (numericIds.length !== selectedIds.length) {
      setProcessError("IDs inválidos para envio. Selecione novamente.")
      return
    }
    try {
      setProcessing(true)
      setProcessError(null)
      await ComposicaoDadosAnsService.processarLote(numericIds)
      setSelectedIds([])
    } catch (err) {
      console.error(err)
      setProcessError("Erro ao enviar registros para a ANS.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
        
        <ComposicaoAbiHeader 
          numeroAbi={registros.data[0]?.numeroAbi} 
          registroAns={registros.data[0]?.registroAns} 
        />

        <div className="grid grid-cols-1 gap-8">
          <ComposicaoAbiDetailsCard 
            numeroAbi={registros.data[0]?.numeroAbi} 
            registroAns={registros.data[0]?.registroAns} 
            totalRegistros={registros.total} 
          />

          {error ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-red-100 shadow-sm">
              <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Tentar novamente</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <ComposicaoAtendimentosTable 
                registros={registros.data} 
                loading={loading} 
                abiId={id} 
                selectedIds={selectedIds}
                processing={processing}
                onToggle={toggleId}
                onToggleAll={toggleAllCurrent}
                onProcessSelected={handleProcessSelected}
              />
              
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <PaginationControls
                  currentPage={registros.page}
                  totalPages={registros.totalPages}
                  pageSize={registros.pageSize}
                  totalItems={registros.total}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                  disabled={loading}
                  pageSizeOptions={[10, 20, 50, 100]}
                />
                {processError && <p className="text-sm text-red-600 mt-2">{processError}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
