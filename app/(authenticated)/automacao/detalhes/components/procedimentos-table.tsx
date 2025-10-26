import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";


interface ProcedimentoProps {
  procedimentos: any[];
  loadProcedimentos: boolean;
  onViewProcedimento: (procedimento: any) => void;
}

export default function ProcedimentosTable({ procedimentos, loadProcedimentos, onViewProcedimento }: ProcedimentoProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Procedimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Tipo</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Código</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Quantidade</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Valor</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Descrição</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Status</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>

              {loadProcedimentos ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    Carregando atendimentos...
                  </TableCell>
                </TableRow>
              ) : procedimentos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    Nenhum atendimento encontrado.
                  </TableCell>
                </TableRow>
              ) : (procedimentos.map((procedimento) => (
                <tr key={procedimento.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 text-xs">{procedimento.tipo}</td>
                  <td className="py-2 px-2 text-xs">{procedimento.codigo}</td>
                  <td className="py-2 px-2 text-xs">{procedimento.quantidade}</td>
                  <td className="py-2 px-2 text-xs">{procedimento.valor}</td>
                  <td className="py-2 px-2 text-xs">{procedimento.descricao}</td>
                  <td className="py-2 px-2">
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                      Aberto
                    </Badge>
                  </td>
                  <td className="py-2 px-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={() => onViewProcedimento(procedimento)}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}