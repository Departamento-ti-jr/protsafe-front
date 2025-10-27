"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DefesaBaseService } from "@/lib/services/defesa-base.service"
import { usePagination } from "@/hooks/use-pagination"
import { useDebounce } from "@/hooks/use-debounce"
import { type Abi } from "@/lib/services/abis.service"

import { AbiHeader } from "./_components/AbiHeader"
import { AbiDetailsCard } from "./_components/AbiDetailsCard"
import { AtendimentosFilterCard } from "./_components/AtendimentosFilterCard"
import { AtendimentosTable } from "./_components/AtendimentosTable"
import { PaginationControls } from "@/components/ui/pagination-controls"

export default function AutomacaoDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { pagination: atendimentosPaginated, setPagination: setAtendimentoPaginated } = usePagination<Abi>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [abi, setAbi] = useState<Abi | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [atendimentosLoading, setAtendimentosLoading] = useState(false)

  useEffect(() => {
    params.then((resolved) => fetchCabecalhoDefesaBase(resolved.id))
  }, [params])

  useEffect(() => {
    fetchAtendimentos(abi?.numeroABI ? Number(abi.numeroABI) : null)
  }, [abi, currentPage, pageSize, debouncedSearchTerm, statusFilter])

  const fetchCabecalhoDefesaBase = async (id: string) => {
    try {
      const result = await DefesaBaseService.getById(id, { include: ["operadora"] })
      setAbi(result)
    } catch (err) {
      setError("Erro ao carregar os detalhes da ABI.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAtendimentos = async (abiNumero?: number | null) => {
    if (!abiNumero) return
    try {
      setError(null)
      setAtendimentosLoading(true)

      const response = await DefesaBaseService.getAtendimentos({
        page: currentPage,
        limit: pageSize,
        numeroABI: String(abiNumero),
        search: debouncedSearchTerm || undefined,
        status: statusFilter.length ? statusFilter : undefined,
      })

      setAtendimentoPaginated(response)
    } catch (err) {
      console.error(err)
      setError("Erro ao carregar atendimentos. Tente novamente.")
    } finally {
      setAtendimentosLoading(false)
    }
  }

  if (loading) return <div className="p-6">Carregando...</div>
  if (error || !abi) return <div className="p-6 text-red-600">{error || "Não foi possível encontrar os dados da ABI."}</div>

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6 space-y-6">
        <AbiHeader abi={abi} />
        <AbiDetailsCard abi={abi} />
        <AtendimentosFilterCard
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <AtendimentosTable
          atendimentos={atendimentosPaginated.data}
          loading={atendimentosLoading}
        />
        <PaginationControls
          currentPage={atendimentosPaginated.page}
          totalPages={atendimentosPaginated.totalPages}
          pageSize={atendimentosPaginated.pageSize}
          totalItems={atendimentosPaginated.total}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          disabled={loading}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </div>
    </div>
  )
}
