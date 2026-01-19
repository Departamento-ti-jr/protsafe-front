import { useCallback, useEffect, useMemo, useState } from "react"
import type { Abi } from "@/lib/services/abis.service"
import { AbisService } from "@/lib/services/abis.service"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"

interface FiltersState {
  status: string
  id: string
  numeroAbi: string
  numeroProcesso: string
  operadora: string
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
    status: "todos",
    id: "",
    numeroAbi: "",
    numeroProcesso: "",
    operadora: "",
  })

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
  })

  const normalizedFilters = useMemo(
    () => ({
      status: filters.status,
      id: filters.id.trim(),
      numeroAbi: filters.numeroAbi.trim(),
      numeroProcesso: filters.numeroProcesso.trim(),
      operadora: filters.operadora.trim(),
    }),
    [filters]
  )

  const loadAbis = useCallback(async () => {
    setLoading(true)
    try {
      const response = await AbisService.getAll({
        page: pagination.page,
        limit: pagination.pageSize,
        id: normalizedFilters.id || undefined,
        numeroAbi: normalizedFilters.numeroAbi || undefined,
        numeroProcesso: normalizedFilters.numeroProcesso || undefined,
        operadora: normalizedFilters.operadora || undefined,
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
    normalizedFilters.id,
    normalizedFilters.status,
    normalizedFilters.numeroAbi,
    normalizedFilters.numeroProcesso,
    normalizedFilters.operadora,
  ])

  useEffect(() => {
    loadAbis()
  }, [loadAbis])

  const handleIdChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, id: value }))
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

  const handleNumeroProcessoChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, numeroProcesso: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const handleOperadoraChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, operadora: value }))
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
    handleIdChange,
    handleStatusChange,
    handleNumeroAbiChange,
    handleNumeroProcessoChange,
    handleOperadoraChange,
    handlePageChange,
    handlePageSizeChange,
    refetch: loadAbis,
  }
}
