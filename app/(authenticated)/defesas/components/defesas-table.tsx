"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { PenSquare, FileText } from "lucide-react"
import Link from "next/link"
import type { Defesa } from "@/lib/services/defesas.service"

const formatDateTime = (value?: string | null) => {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

interface DefesasTableProps {
  data: Defesa[],
  loading: boolean
}

export default function DefesasTable({ data, loading = false }: DefesasTableProps) {

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium text-gray-900">ABI</TableHead>
            <TableHead className="font-medium text-gray-900">Número do ofício</TableHead>
            <TableHead className="font-medium text-gray-900">Nome da operadora / CNPJ</TableHead>
            <TableHead className="font-medium text-gray-900">N° Order</TableHead>
            <TableHead className="font-medium text-gray-900">Atendimento</TableHead>
            <TableHead className="font-medium text-gray-900">Data</TableHead>
            <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                {loading ? 'Carregando...' : `Nenhuma Defesa encontrada.`}
              </TableCell>
            </TableRow>
          ) :
          (data.map((defesa, index) => {
            const atendimento: any = defesa.atendimento ?? (defesa as any).atendimento
            const abi = atendimento?.abi ?? atendimento
            const operadora = defesa.operadora ?? abi?.operadora
            const pdfUrl = defesa.caminhoS3Pdf ?? (defesa as any).s3PdfPath
            const version = defesa.atualizadoEm ?? defesa.updatedAt ?? Date.now()
            const pdfHref = pdfUrl ? `${pdfUrl}?v=${encodeURIComponent(version)}` : undefined

            const numeroAbi =
              abi?.numeroAbi ??
              abi?.numeroABI ??
              atendimento?.numeroAbi ??
              atendimento?.numeroABI ??
              "—"

            const numeroOficio = atendimento?.numeroOficio ?? atendimento?.numeroProcesso ?? "—"
            const opcaoOrdem = defesa.opcaoOrdem ?? defesa.opcaoOrdem ?? "—"
            const atendimentoCodigo = atendimento?.numeroAihApac ?? atendimento?.numeroAih ?? "—"
            const createdAt = defesa.criadoEm ?? defesa.createdAt
            const defenceId = defesa.id ?? defesa._id
            const rowKey = defenceId ?? `${atendimento?.id ?? "defesa"}-${index}`

            return (
              <TableRow key={rowKey} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{numeroAbi}</TableCell>
                <TableCell className="text-gray-600">{numeroOficio}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">
                      <b>{operadora?.razaoSocial ?? operadora?.name ?? "—"}</b><br /> {operadora?.cnpj ?? operadora?.CNPJ ?? "—"}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{opcaoOrdem}</TableCell>
                <TableCell className="font-mono text-sm text-gray-600">{atendimentoCodigo}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {formatDateTime(createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
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
                    <Link href={defenceId ? `/defesas/editar/${defenceId}` : "#"}>
                      <Button variant="ghost" size="icon" title={defenceId ? "Editar" : "Defesa sem ID"} disabled={!defenceId}>
                        <PenSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )
          }))}
        </TableBody>
      </Table>
    </div>
  )
}
