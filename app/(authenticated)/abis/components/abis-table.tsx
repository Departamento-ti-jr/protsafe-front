'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Abi } from "@/lib/services/abis.service"

export default function AbisTable({ data }: { data: Abi[] }) {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>ABI</TableHead>
            {/* <TableHead>Ofício</TableHead> */}
            <TableHead>Processo</TableHead>
            <TableHead>Operadora / CNPJ</TableHead>
            <TableHead>Data / Hora</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Nenhuma ABI encontrada.
              </TableCell>
            </TableRow>
          ) : (
            data.map((abi) => (
              <TableRow key={abi._id}>
                <TableCell>{abi.numeroABI}</TableCell>
                {/* <TableCell>{abi.numeroOficio}</TableCell> */}
                <TableCell>{abi.numeroProcesso}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{abi.razaoSocial}</div>
                    <div className="text-sm text-gray-500"><b>{abi.operadoraName}</b> <br /> {abi.cnpj  }</div>
                  </div>
                </TableCell>
                <TableCell>{abi.dataRegistroTransacao} {abi.horaRegistroTransacao}</TableCell>
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
  )
}
