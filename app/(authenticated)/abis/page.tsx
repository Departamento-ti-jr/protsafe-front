'use client'

import { useState, useEffect } from "react"
import { AbisService, type Abi } from "@/lib/services/abis.service"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"
import AbisFilters from "./components/abis-filters"
import AbisTable from "./components/abis-table"
import AbisPagination from "./components/abis-pagination"
import AbisLoaderOrError from "./components/abis-loader-or-error"

export default function ABIsPage() {
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<Abi>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  useEffect(() => {
    const loadAbis = async () => {
      setLoading(true)
      try {
        const response = await AbisService.getAll({
          page: currentPage,
          limit: pageSize,
          search: searchTerm || undefined,
          status: statusFilter !== "todos" ? statusFilter : undefined,
        })
        setPaginatedData(response)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Erro ao carregar ABIs.")
      } finally {
        setLoading(false)
      }
    }

    loadAbis()
  }, [currentPage, pageSize, searchTerm, statusFilter])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">ABIs</h1>

      <AbisLoaderOrError loading={loading} error={error} onRetry={() => setCurrentPage((p) => p)} />

      {!loading && !error && (
        <>
          <AbisFilters
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          <AbisTable data={paginatedData.data} />

          <AbisPagination
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            totalItems={paginatedData.total}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </div>
  )
}
