import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Download, Loader2 } from "lucide-react"
import type { ComposicaoDadosAbiRegistro } from "@/lib/services/composicao-dados-ans.service"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Props {
  registros: ComposicaoDadosAbiRegistro[]
  loading: boolean
  abiId: string
}

export function ComposicaoAtendimentosTable({ registros, loading, abiId }: Props) {
  return (
    <Card className="border-slate-200 shadow-md overflow-hidden bg-white">
      <CardHeader className="border-b border-slate-50 bg-slate-50/30">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          Registros de Atendimento
          {loading && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] font-bold py-4">Ordem</TableHead>
                <TableHead className="font-bold">Pedido / AIH</TableHead>
                <TableHead className="font-bold">Alegações</TableHead>
                <TableHead className="font-bold">Vigência</TableHead>
                <TableHead className="font-bold">Tipo</TableHead>
                <TableHead className="font-bold text-center">Docs</TableHead>
                <TableHead className="text-right pr-6 font-bold">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && registros.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-20 text-slate-400">Carregando dados...</TableCell></TableRow>
              ) : registros.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-20 text-slate-400">Nenhum registro encontrado.</TableCell></TableRow>
              ) : (
                registros.map((item) => (
                  <TableRow key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                    <TableCell className="font-mono text-xs font-medium text-slate-500 uppercase italic">
                      #{item.ordem}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-700">{item.pedidoDefesa}</span>
                        <span className="text-[10px] font-mono text-slate-400">{item.numeroAihApac}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[250px]">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-slate-600 line-clamp-1" title={item.descricaoPrimeiraAlegacao}>
                          1. {item.descricaoPrimeiraAlegacao || item.codigoPrimeiraAlegacao}
                        </p>
                        {item.descricaoSegundaAlegacao && (
                          <p className="text-[10px] text-slate-400 line-clamp-1">
                            2. {item.descricaoSegundaAlegacao}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-[11px] text-slate-600 flex flex-col">
                        <span>{item.dataInicial || "--"}</span>
                        <span className="text-slate-300">até</span>
                        <span>{item.dataFinal || "--"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold border-slate-200 bg-white shadow-sm">
                        {item.tipoDefesa || "Padrão"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                       <span className={`text-xs font-bold ${item.qtdDocumentos > 0 ? 'text-indigo-600' : 'text-slate-300'}`}>
                        {item.qtdDocumentos}
                       </span>
                    </TableCell>
                    <TableCell className="text-right pr-4 space-x-1">
                      <div className="flex justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                          asChild={!!item.s3PathDocPrincipal}
                          disabled={!item.s3PathDocPrincipal}
                        >
                          <a href={item.s3PathDocPrincipal ?? "#"} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                        <Link href={`/automacao/detalhes/${abiId}/registro/${item.id}`}>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}