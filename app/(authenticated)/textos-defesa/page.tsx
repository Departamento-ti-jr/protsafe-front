"use client"

import { useState, useEffect } from "react"
import { TextosDefesaService, type TextoDefesa } from "@/lib/services/textos-defesa.service"
import { type PaginatedResponse, PaginationControls, PaginationInfo } from "@/components/ui/pagination-controls"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenSquare, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useAuthContext } from "@/components/auth-provider"

export default function TextosDefesaPage() {
  const { isAuthenticated } = useAuthContext()
  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<TextoDefesa>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  useEffect(() => {
    if (isAuthenticated) {
      loadTextosDefesa()
    }
  }, [isAuthenticated, currentPage, pageSize, searchTerm])

  const loadTextosDefesa = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TextosDefesaService.getAll({
        page: currentPage,
        limit: pageSize,
        search: searchTerm || undefined,
      })
      setPaginatedData(data)
    } catch (err) {
      setError("Erro ao carregar textos de defesa. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-600">Você precisa estar autenticado para acessar esta página.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Textos de defesa</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">Carregando textos de defesa...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Textos de defesa</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <p className="text-red-600">{error}</p>
          <Button onClick={loadTextosDefesa}>Tentar novamente</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Textos de defesa</h1>
        <PaginationInfo
          currentPage={paginatedData.page}
          totalPages={paginatedData.totalPages}
          totalItems={paginatedData.total}
          itemsPerPage={paginatedData.pageSize}
        />
      </div>

      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar textos..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="ml-auto">
          <Link href="/textos-defesa/novo">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Texto
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">Nome</TableHead>
              <TableHead className="font-medium text-gray-900">Texto</TableHead>
              <TableHead className="font-medium text-gray-900">Atualizado em</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  {searchTerm ? "Nenhum texto encontrado para a busca." : "Nenhum texto de defesa cadastrado."}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.data.map((texto) => (
                <TableRow key={texto._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900 max-w-xs">
                    <div className="truncate" title={texto.nome}>
                      {texto.nome}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="text-sm text-gray-600 line-clamp-2">{stripHtml(texto.texto)}</div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(texto.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/textos-defesa/editar/${texto._id}`}>
                      <Button variant="ghost" size="icon">
                        <PenSquare className="h-4 w-4" />
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
