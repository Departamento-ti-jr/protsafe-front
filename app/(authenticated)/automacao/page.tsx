'use client'

import AbisFilters from "./_components/automacao-filters"
import AbisTable from "./_components/automacao-table"
import AbisPagination from "./_components/automacao-pagination"
import AbisLoaderOrError from "./_components/automacaos-loader-or-error"
import { useComposicaoAbisList } from "./hooks/use-composicao-abis-list"

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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Automação</h1>

      <AbisLoaderOrError loading={loading} error={error} onRetry={refetch} />

      {!loading && !error && (
        <>
          <AbisFilters
            searchTerm={filters.search}
            onSearch={handleSearch}
            statusFilter={filters.status}
            onStatusChange={handleStatusChange}
          />

          <AbisTable data={data.data} loading={loading} />

          <AbisPagination
            currentPage={pagination.page}
            totalPages={data.totalPages}
            totalItems={data.total}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  )
}
