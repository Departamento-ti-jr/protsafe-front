"use client"

import { useState, useEffect } from "react"
import { TextosDefesaService, type TextoDefesa } from "@/lib/services/textos-defesa.service"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenSquare, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useAuthContext } from "@/components/auth-provider"

export default function TextosDefesaPage() {
  const { isAuthenticated } = useAuthContext()
  const [textosDefesa, setTextosDefesa] = useState<TextoDefesa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      loadTextosDefesa()
    }
  }, [isAuthenticated])

  const loadTextosDefesa = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TextosDefesaService.getAll()
      setTextosDefesa(data)
    } catch (err) {
      setError("Erro ao carregar textos de defesa. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredTextos = textosDefesa.filter(
    (texto) =>
      texto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      texto.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        <p className="text-sm text-gray-600 mt-1">
          {filteredTextos.length} texto{filteredTextos.length !== 1 ? "s" : ""} encontrado
          {filteredTextos.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar textos..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-auto">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Texto
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">Código</TableHead>
              <TableHead className="font-medium text-gray-900">Nome</TableHead>
              <TableHead className="font-medium text-gray-900">Texto</TableHead>
              <TableHead className="font-medium text-gray-900">Atualizado em</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTextos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  {searchTerm ? "Nenhum texto encontrado para a busca." : "Nenhum texto de defesa cadastrado."}
                </TableCell>
              </TableRow>
            ) : (
              filteredTextos.map((texto) => (
                <TableRow key={texto._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{texto.id}</TableCell>
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

      {/* Paginação - pode ser implementada posteriormente */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="icon" disabled>
          &lt;&lt;
        </Button>
        <Button variant="outline" size="icon" disabled>
          &lt;
        </Button>
        <Button size="sm">1</Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="icon">
          &gt;
        </Button>
        <Button variant="outline" size="icon">
          &gt;&gt;
        </Button>
      </div>
    </div>
  )
}
