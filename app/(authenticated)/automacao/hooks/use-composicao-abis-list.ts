import { useCallback, useEffect, useState } from "react"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"
import { ComposicaoDadosAnsService, type ComposicaoDadosAbi } from "@/lib/services/composicao-dados-ans.service"

interface FiltersState {
  search: string
  status: string
}

interface PaginationState {
  page: number
  pageSize: number
}

const createEmptyResponse = (): PaginatedResponse<ComposicaoDadosAbi> => ({
  data: [],
  total: 0,
  page: 1,
  pageSize: 20,
  totalPages: 1,
})

export function useComposicaoAbisList(initialPageSize = 20) {
  const [data, setData] = useState<PaginatedResponse<ComposicaoDadosAbi>>(createEmptyResponse)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    status: "todos",
  })

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
  })

  const loadAbis = useCallback(async () => {
    setLoading(true)
    try {
      const response = await ComposicaoDadosAnsService.getAll({
        page: pagination.page,
        pageSize: pagination.pageSize,
        search: filters.search.trim() || undefined,
        status: filters.status !== "todos" ? filters.status : undefined,
      })
      setData(response)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Erro ao carregar ABIs.")
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.pageSize, filters.search, filters.status])

  useEffect(() => {
    loadAbis()
  }, [loadAbis])

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const handleStatusChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, status: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setPagination({ page: 1, pageSize })
  }, [])

  return {
    data,
    loading,
    error,
    filters,
    pagination,
    handleSearch,
    handleStatusChange,
    handlePageChange,
    handlePageSizeChange,
    refetch: loadAbis,
  }
}
