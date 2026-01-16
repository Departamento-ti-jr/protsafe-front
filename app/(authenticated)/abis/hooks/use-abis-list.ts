import { useCallback, useEffect, useMemo, useState } from "react"
import type { Abi } from "@/lib/services/abis.service"
import { AbisService } from "@/lib/services/abis.service"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"

interface FiltersState {
  search: string
  status: string
  numeroAbi: string
}

interface PaginationState {
  page: number
  pageSize: number
}

const createEmptyResponse = (): PaginatedResponse<Abi> => ({
  data: [],
  total: 0,
  page: 1,
  pageSize: 20,
  totalPages: 1,
})

export function useAbisList(initialPageSize = 20) {
  const [data, setData] = useState<PaginatedResponse<Abi>>(createEmptyResponse)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    status: "todos",
    numeroAbi: "",
  })

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
  })

  const normalizedFilters = useMemo(
    () => ({
      search: filters.search.trim(),
      status: filters.status,
      numeroAbi: filters.numeroAbi.trim(),
    }),
    [filters]
  )

  const loadAbis = useCallback(async () => {
    setLoading(true)
    try {
      const response = await AbisService.getAll({
        page: pagination.page,
        limit: pagination.pageSize,
        search: normalizedFilters.search || undefined,
        numeroABI: normalizedFilters.numeroAbi || undefined,
        status:
          normalizedFilters.status !== "todos"
            ? normalizedFilters.status
            : undefined,
      })
      setData(response)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Erro ao carregar ABIs.")
    } finally {
      setLoading(false)
    }
  }, [
    pagination.page,
    pagination.pageSize,
    normalizedFilters.search,
    normalizedFilters.status,
    normalizedFilters.numeroAbi,
  ])

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

  const handleNumeroAbiChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, numeroAbi: value }))
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
    handleNumeroAbiChange,
    handlePageChange,
    handlePageSizeChange,
    refetch: loadAbis,
  }
}
