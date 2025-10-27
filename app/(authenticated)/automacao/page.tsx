'use client'

import { useState, useEffect } from "react"
import { type Abi } from "@/lib/services/abis.service"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"
import AbisFilters from "./_components/automacao-filters"
import AbisTable from "./_components/automacao-table"
import AbisPagination from "./_components/automacao-pagination"
import AbisLoaderOrError from "./_components/automacaos-loader-or-error"
import { DefesaBaseService } from "@/lib/services/defesa-base.service"

export default function AutomacaoPage() {
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
    const loadGroupedHeaders = async () => {
      setLoading(true);
      try {
        console.log("Loading grouped headers with page:", currentPage, "and pageSize:", pageSize);
        const response = await DefesaBaseService.getGroupedHeaders({
          page: currentPage,
          limit: pageSize,
        });
        console.log("Fetched grouped headers:", response);
        setPaginatedData(response);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar defesas.");
      } finally {
        setLoading(false);
      }
    };

    loadGroupedHeaders();
  }, [currentPage, pageSize]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Automação</h1>

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
