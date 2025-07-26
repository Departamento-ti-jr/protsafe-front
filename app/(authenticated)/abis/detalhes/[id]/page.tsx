"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AbisService, type Abi } from "@/lib/services/abis.service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, Search } from "lucide-react"
import Link from "next/link"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { useDebounce } from "@/hooks/use-debounce"
import { usePagination } from "@/hooks/use-pagination"

export default function ABIDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { pagination: atendimentosPaginated, setPagination: setAtendimentoPaginated } = usePagination<Abi>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [id, setId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [abi, setAbi] = useState<Abi | null>(null)
  const [cnpj, setCnpj] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    params.then((resolved) => {
      setId(resolved.id)
      fetchAbi(resolved.id)
    })
  }, [params])

  useEffect(() => {
    fetchAtendimentos(cnpj)
  }, [currentPage, pageSize])

  const fetchAbi = async (id: string) => {
    try {
      console.log("Fetching ABI with ID:", id)
      const result = await AbisService.getById(id)
      setAbi(result)
      setCnpj(result.CNPJ)
    } catch (err) {
      setError("Erro ao carregar os detalhes da ABI.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAtendimentos = async (cnpj?: string | null) => {
    try {
      setError(null)
      const response = await AbisService.getAll({
        page: currentPage,
        limit: pageSize,
        cnpj: cnpj,
        search: searchTerm || undefined,
      })
      setAtendimentoPaginated(response)
    } catch (err) {
      setError("Erro ao carregar ABIs. Tente novamente.")
      console.error(err)
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }

  useEffect(() => {
    if (cnpj) {
      fetchAtendimentos(cnpj)
    }
  }, [debouncedSearchTerm])

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (error || !abi) {
    return <div className="p-6 text-red-600">{error || "Não foi possível encontrar os dados da ABI."}</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/abis">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">ABI {abi.numeroABI}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Processo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Número do Processo</p>
              <p className="font-mono">{abi.numeroProcesso}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Nome da Empresa</p>
              <p>{abi.razaoSocial}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">CNPJ</p>
              <p>{abi.CNPJ}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                Aberto
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Valor do Processo</p>
              <p className="font-semibold text-lg">
                R$ {abi.valorTotalProcesso.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Quantidade de Processos</p>
              <p className="font-semibold">{abi.quantidadeProcesso}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Atendimentos fictícios (ainda não vindos do backend) */}
      <Card>
        <CardHeader>
          <CardTitle>Atendimentos</CardTitle>
          <div className="flex items-center py-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar atendimentos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Ordem</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Número do Processo</TableHead>
                  <TableHead>ID Atendimento</TableHead>
                  <TableHead>Competência</TableHead>
                  <TableHead>Data de Emissão</TableHead>
                  <TableHead>Procedimento Principal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atendimentosPaginated.data.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell className="font-mono">{item.numeroProcesso}</TableCell>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>
                      {String(item.competencia)
                        .padStart(6, "0")
                        .replace(/^(\d{2})(\d{4})$/, "$1/$2")}
                    </TableCell>
                    <TableCell>{new Date(item.dataRegistroTransacao).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{item.descricaoProcedimento}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        "Aberto"
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/abis/detalhes/${id}/atendimento/${item._id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PaginationControls
        currentPage={atendimentosPaginated.page}
        totalPages={atendimentosPaginated.totalPages}
        pageSize={atendimentosPaginated.pageSize}
        totalItems={atendimentosPaginated.total}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        disabled={loading}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  )
}
