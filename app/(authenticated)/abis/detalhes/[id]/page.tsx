"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AbisService, type Abi } from "@/lib/services/abis.service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, FileText, Search, Shield, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { useDebounce } from "@/hooks/use-debounce"
import { usePagination } from "@/hooks/use-pagination"
import { ABINavigationBreadcrumb } from "../components/abi-navigation-breadcrumb"
import { ABIAtendimentoDetails } from "../components/abi-atendimento-details"
import { ABIProcedimentoDetails } from "../components/abi-procedimento-details"

type ViewMode = "abi" | "atendimento" | "procedimento"

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
  const [atendimentosLoading, setAtendimentosLoading] = useState(false)

  // Navigation state
  const [viewMode, setViewMode] = useState<ViewMode>("abi")
  const [selectedAtendimento, setSelectedAtendimento] = useState<Abi | null>(null)
  const [selectedProcedimento, setSelectedProcedimento] = useState<any>(null)

  useEffect(() => {
    console.log(atendimentosPaginated);
    params.then((resolved) => {
      setId(resolved.id)
      fetchAbi(resolved.id)
    })
  }, [params])

  useEffect(() => {
    fetchAtendimentos(abi?.numeroABI ? Number(abi.numeroABI) : null)
  }, [abi, currentPage, pageSize])

  const fetchAbi = async (id: string) => {
    try {
      console.log("Fetching ABI with ID:", id)
      const result = await AbisService.getById(id, { include: ["operadora"] })
      setAbi(result)
      setCnpj(result.cnpj || null)
    } catch (err) {
      setError("Erro ao carregar os detalhes da ABI.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }


  const fetchAtendimentos = async (abi?: number | null) => {
    try {
      setError(null)
      setAtendimentosLoading(true)

      const response = await AbisService.getAtendimentos({
        page: currentPage,
        limit: pageSize,
        numeroABI: abi != null ? String(abi) : undefined
      })

      console.log("Fetched atendimentos:", response)
      setAtendimentoPaginated(response)
    } catch (err) {
      setError("Erro ao carregar atendimentos. Tente novamente.")
      console.error(err)
    } finally {
      setAtendimentosLoading(false)
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

  const handleViewAtendimento = (atendimento: Abi) => {
    setSelectedAtendimento(atendimento) // Usando o item real agora
    setViewMode("atendimento")
  }

  const handleViewProcedimento = (procedimento: any) => {
    setSelectedProcedimento(procedimento)
    setViewMode("procedimento")
  }

  const handleBackToAbi = () => {
    setViewMode("abi")
    setSelectedAtendimento(null)
    setSelectedProcedimento(null)
  }

  const handleBackToAtendimento = () => {
    setViewMode("atendimento")
    setSelectedProcedimento(null)
  }

  const handleNewDefender = (idAtendimento: string) => {
    router.push(`/defesas/nova/${idAtendimento}`)
  }

  const handleEditDefender = (defenceId: string) => {
    router.push(`/defesas/editar/${defenceId}`)
  }

  // useEffect(() => {
  //   if (cnpj) {
  //     fetchAtendimentos(cnpj)
  //   }
  // }, [debouncedSearchTerm])

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (error || !abi) {
    return <div className="p-6 text-red-600">{error || "Não foi possível encontrar os dados da ABI."}</div>
  }

  const getCurrentStep = (): "abi" | "atendimento" | "procedimento" => {
    return viewMode
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ABINavigationBreadcrumb
        currentStep={getCurrentStep()}
        abiId={id || undefined}
        atendimentoId={selectedAtendimento?._id}
        procedimentoId={selectedProcedimento?.id}
        onNavigateToAbi={handleBackToAbi}
        onNavigateToAtendimento={selectedAtendimento ? handleBackToAtendimento : undefined}
      />

      <div className="flex-1 p-6 space-y-6">
        {viewMode === "abi" && (
          <>
            <div className="flex items-center gap-4">
              <Link href="/abis">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">ABI {abi.numeroABI}</h1>
                <p className="text-sm text-gray-600">Confira os detalhes da "ABI {abi.numeroABI}"</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Você está visualizando a "ABI {abi.numeroABI}"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Número da ABI</p>
                    <p className="font-semibold">{abi.numeroABI}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Número do Processo</p>
                    <p className="font-mono">{abi.numeroProcesso}</p>
                  </div>
                  {/* <div>
                    <p className="text-sm font-medium text-gray-500">Número do ofício</p>
                    <p className="font-semibold">{abi.numeroOficio}</p>
                  </div> */}
                  <div></div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome da operadora</p>
                    <p>{abi?.operadora?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">CNPJ</p>
                    <p>{abi.cnpj}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Data / Hora registro da transação</p>
                    <p>{new Date().toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registro ANS</p>
                    <p className="font-semibold">342033</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                      Aberto
                    </Badge>
                  </div>
                  {/* <div>
                    <p className="text-sm font-medium text-gray-500">Quantidade de processos</p>
                    <p className="font-semibold">{abi.quantidadeProcesso}</p>
                  </div> */}
                  {/* <div>
                    <p className="text-sm font-medium text-gray-500">Valor total dos processos</p>
                    <p className="font-semibold text-lg">
                      R$ {abi?.valorTotalProcesso?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atendimentos</CardTitle>
                <div className="flex items-center py-4">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Difícil de encontrar? Digite aqui que vamos encontrar para você..."
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
                        <TableHead className="w-[80px]">N° Ordem</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>N° Processo</TableHead>
                        <TableHead>N° Atendimento</TableHead>
                        <TableHead>Competência</TableHead>
                        <TableHead>Data Inicial</TableHead>
                        <TableHead>Data Final</TableHead>
                        <TableHead>Procedimento Principal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {atendimentosLoading ? (
                        <TableRow>
                          <TableCell colSpan={10} className="text-center py-8">
                            Carregando atendimentos...
                          </TableCell>
                        </TableRow>
                      ) : atendimentosPaginated.data.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} className="text-center py-8">
                            Nenhum atendimento encontrado.
                          </TableCell>
                        </TableRow>
                      ) : (
                      atendimentosPaginated.data.map((item, index) => {
                        console.log("Rendering atendimento item:", item);
                        const pdfUrl = (item as any).s3PdfPath as string | undefined
                        const rawUrl = (item as any).s3PdfPath as string | undefined;
                        const version = (item as any).updatedAt ?? Date.now();
                        const pdfHref = rawUrl ? `${rawUrl}?v=${encodeURIComponent(version)}` : undefined;
                        return (
                          <TableRow key={item._id}>
                            <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                            <TableCell>{item.tipo}</TableCell>
                            <TableCell className="font-mono">{item.numeroProcesso}</TableCell>
                            <TableCell>{item.numeroAihApac}</TableCell>
                            <TableCell>
                              {String(item.comp)
                                .padStart(6, "0")
                                .replace(/^(\d{2})(\d{4})$/, "$1/$2")}
                            </TableCell>
                            <TableCell>{item?.dataInicial}</TableCell>
                            <TableCell>{item?.dataFinal}</TableCell>
                            <TableCell>{item.descricaoProcedimento}</TableCell>
                            <TableCell>
                              <Badge variant={item.defenceId ? "success" : "warning"} className={item.defenceId ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                {item.defenceId ? "Defendido" : "Aberto"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end">
                                {pdfUrl ? (
                                    <a href={pdfHref} target="_blank" rel="noopener noreferrer" title="Abrir PDF">
                                      <Button variant="ghost" size="icon">
                                        <FileText className="h-4 w-4" />
                                      </Button>
                                    </a>
                                  ) : (
                                    <Button variant="ghost" size="icon" title="PDF não disponível" disabled>
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => { item.defenceId ? handleEditDefender(item.defenceId) : handleNewDefender(item._id)}}
                                >
                                  <ShieldCheck className="h-4 w-4" />  
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {}}
                                >
                                  <Shield className="h-4 w-4" />  
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleViewAtendimento(item)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      }))}
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
              pageSizeOptions={[5, 10, 20, 50, 100]}
            />
          </>
        )}

        {viewMode === "atendimento" && selectedAtendimento && (
          <ABIAtendimentoDetails
            atendimento={selectedAtendimento}
            onBack={handleBackToAbi}
            onViewProcedimento={handleViewProcedimento}
          />
        )}

        {viewMode === "procedimento" && selectedProcedimento && (
          <ABIProcedimentoDetails procedimento={selectedProcedimento} onBack={handleBackToAtendimento} />
        )}
      </div>
    </div>
  )
}
