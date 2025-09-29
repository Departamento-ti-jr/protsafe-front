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

interface DefesasTableProps {
  data: Defesa[]
}

export default function DefesasTable({ data }: DefesasTableProps) {

  if (!data.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        Nenhuma defesa encontrada.
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
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
          {data.map((defesa) => {
            const info = (defesa as any).atendimento
            const pdfUrl = (defesa as any).s3PdfPath as string | undefined
            const rawUrl = (defesa as any).s3PdfPath as string | undefined;
            const version = (defesa as any).updatedAt ?? Date.now();
            const pdfHref = rawUrl ? `${rawUrl}?v=${encodeURIComponent(version)}` : undefined;

            return (
              <TableRow key={defesa._id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{info?.numeroABI}</TableCell>
                <TableCell className="text-gray-600"></TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">
                      <b>{info?.operadora?.name}</b><br /> {info?.operadora?.CNPJ}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{(defesa as any).orderOption}</TableCell>
                <TableCell className="font-mono text-sm text-gray-600">{info?.numeroAihApac}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date((defesa as any).createdAt).toLocaleString("pt-BR")}
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
                     <Link href={`/defesas/editar/${defesa._id}`}>
                      <Button variant="ghost" size="icon" title="Editar">
                        <PenSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
