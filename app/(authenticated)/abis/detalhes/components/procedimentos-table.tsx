import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { ProcedimentoRelacionado } from "../hooks/use-procedimentos-relacionados"

interface ProcedimentosTableProps {
  procedimentos: ProcedimentoRelacionado[]
  isLoading: boolean
  onViewProcedimento: (procedimento: ProcedimentoRelacionado) => void
}

export default function ProcedimentosTable({
  procedimentos,
  isLoading,
  onViewProcedimento,
}: ProcedimentosTableProps) {
  const hasData = procedimentos.length > 0

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Procedimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={7} className="py-6 text-center text-sm text-muted-foreground">
                    Carregando procedimentos...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && !hasData && (
                <TableRow>
                  <TableCell colSpan={7} className="py-6 text-center text-sm text-muted-foreground">
                    Nenhum procedimento encontrado.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                hasData &&
                procedimentos.map((procedimento) => (
                  <TableRow key={procedimento.id}>
                    <TableCell className="text-xs">{procedimento.tipo ?? "—"}</TableCell>
                    <TableCell className="text-xs">{procedimento.codigo ?? "—"}</TableCell>
                    <TableCell className="text-xs">
                      {procedimento.quantidade ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs">{procedimento.valor ?? "—"}</TableCell>
                    <TableCell className="text-xs">{procedimento.descricao ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                        Aberto
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewProcedimento(procedimento)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
