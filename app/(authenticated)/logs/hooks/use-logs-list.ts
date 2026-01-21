import { useCallback, useEffect, useMemo, useState } from "react"
import type { AppLog } from "@/lib/services/logs.service"
import { LogsService } from "@/lib/services/logs.service"

interface LogsData {
  logs: AppLog[]
  total: number
  page: number
  limit: number
  totalPages: number
}

interface FiltersState {
  level: string
}

interface PaginationState {
  page: number
  pageSize: number
}

const createEmptyResponse = (pageSize: number): LogsData => ({
  logs: [],
  total: 0,
  page: 1,
  limit: pageSize,
  totalPages: 1,
})

export function useLogsList(initialPageSize = 20) {
  const [data, setData] = useState<LogsData>(() => createEmptyResponse(initialPageSize))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState<FiltersState>({
    level: "INFO",
  })

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
  })

  const normalizedFilters = useMemo(
    () => ({
      level: filters.level.trim(),
    }),
    [filters]
  )

  const loadLogs = useCallback(async () => {
    setLoading(true)
    try {
      const response = await LogsService.getAll({
        page: pagination.page,
        limit: pagination.pageSize,
        level: normalizedFilters.level !== "todos" ? normalizedFilters.level : undefined,
      })

      const total = response.total ?? response.logs.length
      const limit = response.limit ?? pagination.pageSize
      const totalPages = response.totalPages ?? Math.max(1, Math.ceil(total / limit))

      setData({
        logs: response.logs ?? [],
        total,
        page: response.page ?? pagination.page,
        limit,
        totalPages,
      })
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Erro ao carregar logs.")
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.pageSize, normalizedFilters.level])

  useEffect(() => {
    loadLogs()
  }, [loadLogs])

  const handleLevelChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, level: value }))
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
    handleLevelChange,
    handlePageChange,
    handlePageSizeChange,
    refetch: loadLogs,
  }
}
