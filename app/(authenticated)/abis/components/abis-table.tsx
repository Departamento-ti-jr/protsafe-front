'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Abi } from "@/lib/services/abis.service"
import { formatDateTimeToDDMMYYYYHHMMSS } from "@/lib/date-helpers"

export default function AbisTable({ data, loading = false }: { data: Abi[], loading?: boolean }) {
  return (
    <Table>
      <TableHeader className="bg-slate-50/50">
        <TableRow>
          <TableHead className="font-bold text-slate-600 py-4 pl-6">Nº ABI</TableHead>
          <TableHead className="font-bold text-slate-600">Processo Administrativo</TableHead>
          <TableHead className="font-bold text-slate-600">Operadora</TableHead>
          <TableHead className="font-bold text-slate-600">Data de Criação</TableHead>
          <TableHead className="font-bold text-slate-600">Status</TableHead>
          <TableHead className="text-right pr-6 font-bold text-slate-600">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && data.length === 0 ? (
          <TableRow><TableCell colSpan={6} className="text-center py-20 text-slate-400">Carregando ABIs...</TableCell></TableRow>
        ) : data.length === 0 ? (
          <TableRow><TableCell colSpan={6} className="text-center py-20 text-slate-400 font-medium italic text-lg">Nenhuma ABI encontrada com esses filtros.</TableCell></TableRow>
        ) : (
          data.map((abi) => (
            <TableRow key={abi.id} className="group hover:bg-slate-50/50 transition-colors">
              <TableCell className="pl-6 font-bold text-primary">
                {abi.numeroAbi}
              </TableCell>
              <TableCell>
                <div className="text-sm font-mono text-slate-500 bg-slate-100/50 px-2 py-1 rounded w-fit">
                  {abi.numeroProcesso}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col py-1">
                  <span className="font-semibold text-slate-800 leading-tight line-clamp-1">{abi.razaoSocial}</span>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 uppercase tracking-tight font-medium">
                    <span className="text-primary/70">{abi.operadoraNome}</span>
                    <span className="text-slate-300">•</span>
                    <span>{abi.operadoraCnpj}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-slate-600">
                  {formatDateTimeToDDMMYYYYHHMMSS(abi.createdAt)}
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 px-3">
                  Ativo
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-6">
                <Link href={`/abis/detalhes/${abi.id}`}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 text-slate-400 hover:text-primary hover:bg-primary/10 flex items-center gap-2 ml-auto"
                  >
                    <span className="text-xs font-semibold">Detalhes</span>
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
