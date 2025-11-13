import { useCallback, useEffect, useMemo, useState } from "react"
import type { Abi } from "@/lib/services/abis.service"
import { AbisService } from "@/lib/services/abis.service"
import { AtendimentosService, type Atendimento } from "@/lib/services/atendimentos.service"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"

const createEmptyPaginated = (): PaginatedResponse<Atendimento> => ({
  data: [],
  total: 0,
  page: 1,
  pageSize: 5,
  totalPages: 1,
})

interface UseAbiDetailsOptions {
  initialPageSize?: number
}

export function useAbiDetails(abiId?: string, options: UseAbiDetailsOptions = {}) {
  const [abi, setAbi] = useState<Abi | null>(null)
  const [abiLoading, setAbiLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [atendimentos, setAtendimentos] = useState<PaginatedResponse<Atendimento>>(createEmptyPaginated)
  const [atendimentosLoading, setAtendimentosLoading] = useState(false)

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: options.initialPageSize ?? 5,
  })

  const [searchTerm, setSearchTerm] = useState("")

  const abiIdentifier = useMemo(() => {
    if (abi?.id && !Number.isNaN(Number(abi.id))) {
      return Number(abi.id)
    }
    if (abi?.numeroAbi && !Number.isNaN(Number(abi.numeroAbi))) {
      return Number(abi.numeroAbi)
    }
    if (abiId && !Number.isNaN(Number(abiId))) {
      return Number(abiId)
    }
    return null
  }, [abi?.id, abi?.numeroAbi, abiId])

  const loadAbi = useCallback(async () => {
    if (!abiId) return
    setAbiLoading(true)
    try {
      const response = await AbisService.getById(abiId, { include: ["operadora"] })
      setAbi(response)
      setError(null)
    } catch (err) {
      console.error(err)
      setAbi(null)
      setError("Erro ao carregar ABI.")
    } finally {
      setAbiLoading(false)
    }
  }, [abiId])

  const loadAtendimentos = useCallback(async () => {
    if (!abiIdentifier) return
    setAtendimentosLoading(true)
    try {
      const response = await AtendimentosService.getAll({
        page: pagination.page,
        limit: pagination.pageSize,
        abiId: abiIdentifier,
        numeroProcesso: searchTerm || undefined,
      })
      setAtendimentos(response)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Erro ao carregar atendimentos.")
    } finally {
      setAtendimentosLoading(false)
    }
  }, [abiIdentifier, pagination.page, pagination.pageSize, searchTerm])

  useEffect(() => {
    loadAbi()
  }, [loadAbi])

  useEffect(() => {
    loadAtendimentos()
  }, [loadAtendimentos])

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setPagination({ page: 1, pageSize })
  }, [])

  return {
    abi,
    abiLoading,
    error,
    atendimentos,
    atendimentosLoading,
    searchTerm,
    handleSearch,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    refetchAbi: loadAbi,
    refetchAtendimentos: loadAtendimentos,
  }
}
