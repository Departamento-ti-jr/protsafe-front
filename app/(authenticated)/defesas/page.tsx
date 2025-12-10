'use client'

import { useState, useEffect } from "react"
import { DefesasService, type Defesa } from "@/lib/services/defesas.service"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"
import DefesasFilters from "./components/defesas-filters"
import DefesasTable from "./components/defesas-table"
import DefesasPagination from "./components/defesas-pagination"
import DefesasLoaderOrError from "./components/defesas-loader-or-error"
import { useLoadingIndicator } from "@/components/loading-indicator"

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

  useEffect(() => {
    const loadDefesas = async () => {
      startLoading();
      setLoading(true);
      try {
        console.log("Loading defesas with params:", {
          page: currentPage,
          limit: pageSize,
          search: searchTerm,
        });
        const response = await DefesasService.getAllWithAtendimento({
          page: currentPage,
          limit: pageSize
        })
        setPaginatedData(response)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Erro ao carregar Defesas.")
      } finally {
        setLoading(false)
        stopLoading();
      }
    }

    loadDefesas()
  }, [currentPage, pageSize, searchTerm])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Defesas</h1>

          <DefesasFilters
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />

          <DefesasTable data={paginatedData.data} loading={loading} />

          <DefesasPagination
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            totalItems={paginatedData.total}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
            
    </div>
  )
}
