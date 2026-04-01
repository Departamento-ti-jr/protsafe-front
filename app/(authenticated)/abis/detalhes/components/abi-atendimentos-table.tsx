"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { FileText, Search, ShieldBanIcon, ShieldCheck, Eye } from "lucide-react"
import { TooltipButton } from "@/components/button-with-tooltip"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"
import type { Atendimento } from "@/lib/services/atendimentos.service"

interface AtendimentoTableProps {
  searchTerm: string
  onSearch: (value: string) => void
  loading: boolean
  paginatedData: PaginatedResponse<Atendimento>
  currentPage: number
  pageSize: number
  formatDate: (date: string | null | undefined) => string
  onEditDefender: (id: string) => void
  onCreateDefender: (id: string) => void
  onMarkAsSemDefesa: (id: string) => void
  onViewAtendimento: (item: Atendimento) => void
}

const formatCompetencia = (value?: string | number | null) => {
  if (!value) return "-"
  const normalized = String(value).padStart(6, "0")
  return normalized.replace(/^(\d{2})(\d{4})$/, "$1/$2")
}

export function AtendimentosTable({
  searchTerm,
  onSearch,
  loading,
  paginatedData,
  currentPage,
  pageSize,
  formatDate,
  onEditDefender,
  onCreateDefender,
  onMarkAsSemDefesa,
  onViewAtendimento,
}: AtendimentoTableProps) {
  const hasData = paginatedData.data.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atendimentos</CardTitle>

        <div className="flex items-center py-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Difícil de encontrar? Digite aqui..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
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
                <TableHead>Tipo Procedimento</TableHead>
                <TableHead>N° Atendimento</TableHead>
                <TableHead>Competência</TableHead>
                <TableHead>Data Inicial</TableHead>
                <TableHead>Data Final</TableHead>
                <TableHead>Procedimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    Carregando atendimentos...
                  </TableCell>
                </TableRow>
              )}

              {!loading && !hasData && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    Nenhum atendimento encontrado.
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                hasData &&
                paginatedData.data.map((item, index) => {
                  const defesa = item.defesa
                  const pdfUrl = defesa?.caminhoS3Pdf ?? null
                  const version = defesa?.atualizadoEm ?? Date.now()
                  const pdfHref = pdfUrl ? `${pdfUrl}?v=${version}` : null
                  const defesaIdentifier = defesa
                    ? String(defesa.id ?? (defesa as any)._id ?? item.id)
                    : null

                  return (
                    <TableRow key={item.id ?? index}>
                      <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                      <TableCell>{item.tipo}</TableCell>
                      <TableCell>{item.tipoProcedimento || "-"}</TableCell>
                      <TableCell>{item.numeroAihApac}</TableCell>
                      <TableCell>{formatCompetencia(item.competencia)}</TableCell>
                      <TableCell>{formatDate(item.dataInicioAtendimento)}</TableCell>
                      <TableCell>{formatDate(item.dataFimAtendimento)}</TableCell>
                      <TableCell>{item.descricaoProcedimento}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.semDefesa && defesa
                              ? "bg-red-200 text-red-500"
                              : !item.semDefesa && defesa
                                ? "bg-teal-100 text-teal-800"
                                : "bg-yellow-100 text-yellow-600"
                          }
                        >
                          {item.semDefesa && defesa
                            ? "S/ Defesa"
                            : !item.semDefesa && defesa
                              ? "Defendido"
                              : "Aberto"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {pdfHref ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                                  <Button variant="ghost" size="icon">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>Visualizar Documento</TooltipContent>
                            </Tooltip>
                          ) : (
                            <TooltipButton tooltip="Documento não disponível" disabled>
                              <Button variant="ghost" size="icon" disabled>
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TooltipButton>
                          )}

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  defesa && defesaIdentifier
                                    ? onEditDefender(defesaIdentifier)
                                    : onCreateDefender(String(item.id))
                                }
                              >
                                <ShieldCheck className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {defesa ? "Editar Defesa" : "Defender"}
                            </TooltipContent>
                          </Tooltip>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <TooltipButton
                                tooltip={
                                  item.semDefesa
                                    ? "Já marcado como 'Sem Defesa'"
                                    : "Marcar como 'Sem Defesa'"
                                }
                                disabled={item.semDefesa}
                              >
                                <Button variant="ghost" size="icon" disabled={item.semDefesa}>
                                  <ShieldBanIcon className="h-4 w-4" />
                                </Button>
                              </TooltipButton>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar ação</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Deseja realmente marcar este atendimento como “sem defesa”?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onMarkAsSemDefesa(String(item.id))}>
                                  Confirmar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <TooltipButton tooltip="Ver detalhes do atendimento">
                            <Button variant="ghost" size="icon" onClick={() => onViewAtendimento(item)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
