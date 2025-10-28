import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AtendimentosTableProps {
  atendimentos: any[]
  loading: boolean
}

export function AtendimentosTable({ atendimentos, loading }: AtendimentosTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atendimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Ordem</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>N° Processo</TableHead>
                <TableHead>N° Atendimento</TableHead>
                <TableHead>Competência</TableHead>
                <TableHead>Qtd. Requerida / Recebida</TableHead>
                <TableHead>Primeira Alegação</TableHead>
                <TableHead>Segunda Alegação</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    Carregando atendimentos...
                  </TableCell>
                </TableRow>
              ) : atendimentos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    Nenhum atendimento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                atendimentos.map((item: any) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.ordem}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell className="font-mono">{item.numeroProcesso}</TableCell>
                    <TableCell>{item.numeroAihApac}</TableCell>
                    <TableCell>
                      {String(item.comp)
                        .padStart(6, "0")
                        .replace(/^(\d{2})(\d{4})$/, "$1/$2")}
                    </TableCell>
                    <TableCell className="text-center">{item?.requiredDocsCount} / {item?.docsReceivedCount}</TableCell>
                    <TableCell>{item?.primeiraAlegacao}</TableCell>
                    <TableCell>{item?.segundaAlegacao}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status === "PROTOCOLO_GERADO"
                            ? "bg-teal-100 text-teal-800"
                            : item.status.startsWith("ERRO")
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {item.status}
                      </Badge>
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
