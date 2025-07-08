"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Plus, Search, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { type Abi, AbisService } from "@/lib/services/abis.service"
import { type PaginatedResponse, PaginationControls, PaginationInfo } from "@/components/ui/pagination-controls"

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
    loadAbis()
  }, [currentPage, pageSize, searchTerm, statusFilter])

  const loadAbis = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await AbisService.getAll({
        page: currentPage,
        limit: pageSize,
        search: searchTerm || undefined,
        status: statusFilter !== "todos" ? statusFilter : undefined,
      })
      setPaginatedData(response)
    } catch (err) {
      setError("Erro ao carregar ABIs. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">ABIs</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Carregando ABIs...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">ABIs</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <p className="text-red-600">{error}</p>
          <Button onClick={loadAbis}>Tentar novamente</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">ABIs</h1>
        <PaginationInfo
          currentPage={paginatedData.page}
          totalPages={paginatedData.totalPages}
          totalItems={paginatedData.total}
          itemsPerPage={paginatedData.pageSize}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar ABIs..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="aberto">Aberto</SelectItem>
              <SelectItem value="fechado">Fechado</SelectItem>
              <SelectItem value="em-andamento">Em Andamento</SelectItem>
            </SelectContent>
          </Select>
          <Link href={`/abis/nova`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova ABI
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>ABI</TableHead>
              <TableHead>Número do ofício</TableHead>
              <TableHead>Número do processo</TableHead>
              <TableHead>Nome da operadora / CNPJ</TableHead>
              <TableHead>Data / Hora registro</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  {searchTerm || statusFilter !== "todos"
                    ? "Nenhuma ABI encontrada para os filtros aplicados."
                    : "Nenhuma ABI encontrada."}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.data.map((abi) => (
                <TableRow key={abi._id}>
                  <TableCell>{abi.numeroABI}</TableCell>
                  <TableCell>{abi.numeroOficio}</TableCell>
                  <TableCell className="font-mono text-sm">{abi.numeroProcesso}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{abi.razaoSocial}</div>
                      <div className="text-sm text-gray-500">{abi.CNPJ}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {abi.dataRegistroTransacao} {abi.horaRegistroTransacao}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-teal-100 text-teal-800">Aberto</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/abis/detalhes/${abi._id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={paginatedData.page}
        totalPages={paginatedData.totalPages}
        pageSize={paginatedData.pageSize}
        totalItems={paginatedData.total}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        disabled={loading}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  )
}
