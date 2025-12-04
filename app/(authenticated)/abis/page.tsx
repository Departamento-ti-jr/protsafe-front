"use client"

import AbisFilters from "./components/abis-filters"
import AbisTable from "./components/abis-table"
import AbisPagination from "./components/abis-pagination"
import AbisLoaderOrError from "./components/abis-loader-or-error"
import { useAbisList } from "./hooks/use-abis-list"
import { useLoadingIndicator } from "@/components/loading-indicator"
import { use, useEffect } from "react"

export default function ABIsPage() {
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
  } = useAbisList()

  const { startLoading, stopLoading } = useLoadingIndicator();

  useEffect(() => {
    if (loading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [loading]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">ABIs</h1>

      {/* <AbisLoaderOrError loading={loading} error={error} onRetry={refetch} /> */}

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
        
    </div>
  )
}
