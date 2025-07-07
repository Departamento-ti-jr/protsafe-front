"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Abi, AbisService } from "@/lib/services/abis.service"

export default function ABIsPage() {
  const [abis, setAbis] = useState<Abi[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const limit = 20

  useEffect(() => {
    loadAbis(page)
  }, [page])

  const loadAbis = async (pageToLoad: number) => {
    try {
      setLoading(true)
      setError(null)
      const response = await AbisService.getAll(pageToLoad, limit)
      setAbis(response.data)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError("Erro ao carregar ABIs. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">ABIs</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar ABIs..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <Select defaultValue="todos">
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-red-500 py-4">
                  {error}
                </TableCell>
              </TableRow>
            ) : abis.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-4">
                  Nenhuma ABI encontrada.
                </TableCell>
              </TableRow>
            ) : (
              abis.map((abi) => (
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

      {/* Paginação funcional */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="icon" onClick={() => goToPage(1)} disabled={page === 1}>
          &lt;&lt;
        </Button>
        <Button variant="outline" size="icon" onClick={() => goToPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        <span className="px-2 text-sm text-gray-700">
          Página {page} de {totalPages}
        </span>
        <Button variant="outline" size="icon" onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
          &gt;
        </Button>
        <Button variant="outline" size="icon" onClick={() => goToPage(totalPages)} disabled={page === totalPages}>
          &gt;&gt;
        </Button>
      </div>
    </div>
  )
}
