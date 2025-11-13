"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import {
  FileText,
  Search,
  ShieldBanIcon,
  ShieldCheck,
  Eye,
} from "lucide-react";

import { TooltipButton } from "@/components/button-with-tooltip";
import { Atendimento } from "@/lib/services/atendimentos.service";

interface AtendimentoTableProps {
  searchTerm: string;
  handleSearch: (value: string) => void;

  atendimentosLoading: boolean;
  atendimentosPaginated: {
    data: any[];
    page?: number;
    pageSize?: number;
    total?: number;
  };

  currentPage: number;
  pageSize: number;

  formatDateToDDMMYYYY: (date: string | null | undefined) => string;

  handleEditDefender: (id: string) => void;
  handleNewDefender: (id: string) => void;
  handleMarkAsSemDefesa: (id: string) => void;
  handleViewAtendimento: (item: any) => void;
}

export function AtendimentosTable({
  searchTerm,
  handleSearch,
  atendimentosLoading,
  atendimentosPaginated,
  currentPage,
  pageSize,
  formatDateToDDMMYYYY,
  handleEditDefender,
  handleNewDefender,
  handleMarkAsSemDefesa,
  handleViewAtendimento,
}: AtendimentoTableProps) {
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
                <TableHead>Procedimento</TableHead>
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
              ) : atendimentosPaginated.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    Nenhum atendimento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                atendimentosPaginated.data.map((item: Atendimento, index: number) => {
                  const defesa = item?.defesa;
                  const pdfUrl = defesa?.caminhoS3Pdf ?? null;
                  const version = defesa?.atualizadoEm ?? Date.now();
                  const pdfHref = pdfUrl ? `${pdfUrl}?v=${version}` : null;

                  const comp =
                    item.competencia
                      ? String(item.competencia)
                          .padStart(6, "0")
                          .replace(/^(\d{2})(\d{4})$/, "$1/$2")
                      : "-";

                  return (
                    <TableRow key={item.id ?? index}>
                      <TableCell>
                        {(currentPage - 1) * pageSize + index + 1}
                      </TableCell>

                      <TableCell>{item.tipo}</TableCell>
                      <TableCell className="font-mono">
                        {item.numeroProcesso}
                      </TableCell>
                      <TableCell>{item.numeroAihApac}</TableCell>

                      <TableCell>{comp}</TableCell>

                      <TableCell>
                        {formatDateToDDMMYYYY(item?.dataInicioAtendimento)}
                      </TableCell>
                      <TableCell>
                        {formatDateToDDMMYYYY(item?.dataFimAtendimento)}
                      </TableCell>

                      <TableCell>{item.descricaoProcedimento}</TableCell>

                      <TableCell>
                        <Badge
                          className={
                            item.semDefesa && item.defesa
                              ? "bg-red-200 text-red-500"
                              : !item.semDefesa && item.defesa
                              ? "bg-teal-100 text-teal-800"
                              : "bg-yellow-100 text-yellow-500"
                          }
                        >
                          {item.semDefesa && item.defesa
                            ? "S/ Defesa"
                            : !item.semDefesa && item.defesa
                            ? "Defendido"
                            : "Aberto"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">

                          {/* --- Visualizar PDF --- */}
                          {pdfHref ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={pdfHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button variant="ghost" size="icon">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                Visualizar Documento
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <TooltipButton tooltip="Documento não disponível" disabled>
                              <Button variant="ghost" size="icon" disabled>
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TooltipButton>
                          )}

                          {/* --- Criar/Editar Defesa --- */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  item.defesa
                                    ? handleEditDefender(defesa.id)
                                    : handleNewDefender(item.id.toString())
                                }
                              >
                                <ShieldCheck className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {item.defesa ? "Editar Defesa" : "Defender"}
                            </TooltipContent>
                          </Tooltip>

                          {/* --- Marcar como Sem Defesa --- */}
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
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={item.semDefesa}
                                >
                                  <ShieldBanIcon className="h-4 w-4" />
                                </Button>
                              </TooltipButton>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirmar ação
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Deseja realmente marcar este atendimento como
                                  “sem defesa”?
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleMarkAsSemDefesa(item.id.toString())
                                  }
                                >
                                  Confirmar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          {/* --- Ver Detalhes --- */}
                          <TooltipButton tooltip="Ver detalhes do atendimento">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewAtendimento(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
