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
import { PenSquare } from "lucide-react"
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
    const info = defesa.atendimento[0]
    return (
      <TableRow key={defesa._id} className="hover:bg-gray-50">
        <TableCell className="font-medium text-gray-900">{info?.numeroABI}</TableCell>
        <TableCell className="text-gray-600">{info?.numeroProcesso}</TableCell>
        <TableCell>
          <div className="space-y-1">
            <div className="font-medium text-gray-900">{info?.razaoSocial}</div>
            <div className="text-sm text-gray-500">{info?.CNPJ}</div>
          </div>
        </TableCell>
        <TableCell className="text-gray-600">{defesa.orderOption}</TableCell>
        <TableCell className="font-mono text-sm text-gray-600">{info?.numero}</TableCell>
        <TableCell className="text-sm text-gray-600">
          {new Date(defesa.createdAt).toLocaleString("pt-BR")}
        </TableCell>
        <TableCell className="text-right">
          <Link href={`/defesas/editar/${defesa._id}`}>
            <Button variant="ghost" size="icon">
              <PenSquare className="h-4 w-4" />
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    )
  })}
</TableBody>

      </Table>
    </div>
  )
}
