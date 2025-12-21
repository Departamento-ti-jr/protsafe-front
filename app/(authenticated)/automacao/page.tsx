'use client'

import AbisFilters from "./_components/automacao-filters"
import AbisTable from "./_components/automacao-table"
import AbisPagination from "./_components/automacao-pagination"
import AbisLoaderOrError from "./_components/automacaos-loader-or-error"
import { useComposicaoAbisList } from "./hooks/use-composicao-abis-list"
import AutomacaoTable from "./_components/automacao-table"
import { useEffect } from "react"
import { useLoadingIndicator } from "@/components/loading-indicator"

export default function AutomacaoPage() {
  const {
    data,
    loading,
    error,
    filters,
    pagination,
    handleSearch,
    handleStatusChange,
    handlePageChange,
    handlePageSizeChange,
    refetch,
  } = useComposicaoAbisList()

  const { startLoading, stopLoading } = useLoadingIndicator();

  useEffect(() => {
    loading ? startLoading() : stopLoading();
  }, [loading]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Automação</h1>

      {/* <AbisLoaderOrError loading={loading} error={error} onRetry={refetch} /> */}


      <>
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <AbisFilters
                searchTerm={filters.search}
                onSearch={handleSearch}
                statusFilter={filters.status}
                onStatusChange={handleStatusChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <AutomacaoTable data={data.data} loading={loading} />

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
      </>

    </div>
  )
}
