"use client"

import AbisFilters from "./components/abis-filters"
import AbisTable from "./components/abis-table"
import AbisPagination from "./components/abis-pagination"
import { useAbisList } from "./hooks/use-abis-list"
import { useLoadingIndicator } from "@/components/loading-indicator"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { Layers, CheckCircle2, Clock, AlertCircle, RefreshCcw } from "lucide-react"

export default function ABIsPage() {
  const {
    data,
    loading,
    error,
    filters,
    pagination,
    handleSearch,
    handleStatusChange,
    handleNumeroAbiChange,
    handlePageChange,
    handlePageSizeChange,
    refetch,
  } = useAbisList()

  const { startLoading, stopLoading } = useLoadingIndicator();

  useEffect(() => {
    loading ? startLoading() : stopLoading();
  }, [loading]);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
        
        {/* Cabeçalho da Página */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gerenciamento de ABIs</h1>
          </div>
          <Button
            variant="outline"
            onClick={refetch}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            {loading ? "Atualizando..." : "Atualizar tabela"}
          </Button>
        </div>

        <div className="space-y-4">
          {/* Barra de Ferramentas (Filtros) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <AbisFilters
              searchTerm={filters.search}
              onSearch={handleSearch}
              numeroAbi={filters.numeroAbi}
              onNumeroAbiChange={handleNumeroAbiChange}
              statusFilter={filters.status}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Tabela de Dados */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <AbisTable data={data.data} loading={loading} />
            
            {/* Paginação Integrada ao Rodapé da Tabela */}
            <div className="border-t border-slate-100 p-4 bg-slate-50/30">
              <AbisPagination
                currentPage={pagination.page}
                totalPages={data.totalPages}
                totalItems={data.total}
                pageSize={pagination.pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ title, value, icon, color }: { title: string, value: any, icon: any, color: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
      <div className={`p-3 rounded-lg bg-slate-50 ${color}`}>{icon}</div>
    </div>
  )
}
