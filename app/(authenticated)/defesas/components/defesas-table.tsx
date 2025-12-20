"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenSquare, FileText, Hash, Building2, Calendar } from "lucide-react"
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

export default function DefesasTable({ data, loading = false }: { data: Defesa[], loading: boolean }) {
  return (
    <Table>
      <TableHeader className="bg-slate-50/50">
        <TableRow className="hover:bg-transparent">
          <TableHead className="py-4 pl-6 font-bold text-slate-600">Identificação (ABI/Ofício)</TableHead>
          <TableHead className="font-bold text-slate-600">Operadora / CNPJ</TableHead>
          <TableHead className="font-bold text-slate-600">Atendimento (AIH/APAC)</TableHead>
          <TableHead className="font-bold text-slate-600">Data de Criação</TableHead>
          <TableHead className="text-right pr-6 font-bold text-slate-600">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-20 text-slate-400">
              {loading ? 'Carregando defesas...' : 'Nenhuma defesa encontrada.'}
            </TableCell>
          </TableRow>
        ) : (
          data.map((defesa, index) => {
            const atendimento = defesa.atendimento ?? (defesa as any).atendimento
            const abi = atendimento?.abi ?? atendimento
            const operadora = defesa.operadora ?? abi?.operadora
            const pdfUrl = defesa.caminhoS3Pdf ?? (defesa as any).s3PdfPath
            
            const numeroAbi = abi?.numeroAbi ?? abi?.numeroABI ?? "—"
            const numeroOficio = atendimento?.numeroOficio ?? atendimento?.numeroProcesso ?? "—"
            const atendimentoCodigo = atendimento?.numeroAihApac ?? atendimento?.numeroAih ?? "—"
            const defenceId = defesa.id ?? defesa._id

            const formattedDate = formatDateTime(defesa.createdAt)
            const [datePart, timePart] = formattedDate.split(', ')

            return (
              <TableRow key={defenceId || index} className="group hover:bg-slate-50/50 transition-colors">
                <TableCell className="pl-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-bold text-primary flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 text-primary/40" />
                      ABI {numeroAbi}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold px-2 py-0.5 bg-slate-100 rounded-md w-fit border border-slate-200/50">
                      Ofício: {numeroOficio}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-start gap-2.5 py-1">
                    <div className="p-1.5 bg-slate-50 rounded border border-slate-100 group-hover:bg-white transition-colors">
                      <Building2 className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 leading-tight line-clamp-1">
                        {operadora?.razaoSocial ?? "Operadora não identificada"}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5 tracking-tighter">
                        {operadora?.cnpj ?? "—"}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-mono text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded w-fit">
                        {atendimentoCodigo}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      Ordem: {defesa.opcaoOrdem || "—"}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-3.5 w-3.5 text-slate-300" />
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-700">{datePart}</span>
                      <span className="text-[10px] opacity-60 font-mono italic">{timePart}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-1.5">
                    {pdfUrl ? (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                        asChild
                      >
                        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" title="Ver PDF">
                          <FileText className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-200 cursor-not-allowed" disabled>
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Link href={defenceId ? `/defesas/editar/${defenceId}` : "#"}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors"
                        disabled={!defenceId}
                        title="Editar Defesa"
                      >
                        <PenSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}