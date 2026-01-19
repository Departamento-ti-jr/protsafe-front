'use client'

import { useState, useEffect, useCallback } from "react"
import { DefesasService, type Defesa } from "@/lib/services/defesas.service"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"
import DefesasFilters from "./components/defesas-filters"
import DefesasTable from "./components/defesas-table"
import DefesasPagination from "./components/defesas-pagination"
import { useLoadingIndicator } from "@/components/loading-indicator"
import { FileStack, FileCheck, FileClock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DefesasPage() {
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<Defesa>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  
  const { startLoading, stopLoading } = useLoadingIndicator();

  const loadDefesas = useCallback(async () => {
    startLoading();
    setLoading(true);
    try {
      const trimmedSearch = searchTerm.trim()
      const numericSearch = trimmedSearch !== "" && /^\d+$/.test(trimmedSearch)
      const searchFilters = {
        numeroAbi:
          numericSearch && trimmedSearch.length <= 4 ? trimmedSearch : undefined,
        numeroAtendimento:
          numericSearch && trimmedSearch.length > 4 ? trimmedSearch : undefined,
        operadora:
          !numericSearch && trimmedSearch !== "" ? trimmedSearch : undefined,
      }
      const response = await DefesasService.getAllWithAtendimento({
        page: currentPage,
        limit: pageSize,
        ...searchFilters,
      })
      setPaginatedData(response)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Não foi possível carregar a lista de defesas.")
    } finally {
      setLoading(false)
      stopLoading();
    }
  }, [currentPage, pageSize, searchTerm, startLoading, stopLoading])

  useEffect(() => {
    loadDefesas()
  }, [loadDefesas])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reseta para a primeira página ao buscar
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
        
        {/* Cabeçalho */}
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Defesas Geradas</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Visualize, edite e gerencie as contestações técnicas para a ANS.
          </p>
        </div>

        <div className="space-y-4">
          {/* Barra de Filtros */}
          <DefesasFilters searchTerm={searchTerm} onSearch={handleSearch} />

          {error ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-red-100 shadow-sm">
              <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => loadDefesas()}>Tentar novamente</Button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Tabela de Dados */}
              <DefesasTable data={paginatedData.data} loading={loading} />
              
              {/* Paginação Integrada ao Rodapé */}
              <div className="border-t border-slate-100 p-4 bg-slate-50/30">
                <DefesasPagination
                  currentPage={currentPage}
                  totalPages={paginatedData.totalPages}
                  totalItems={paginatedData.total}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={setPageSize}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Componente de Card de Estatística Refatorado
 */
function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon 
}: { 
  title: string; 
  value: any; 
  subtitle: string; 
  icon: React.ReactNode 
}) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-800">{value}</span>
          <span className="text-[10px] text-slate-400 font-medium uppercase">{subtitle}</span>
        </div>
      </div>
      <div className="p-2 bg-slate-50 rounded-lg shrink-0">
        {icon}
      </div>
    </div>
  )
}
