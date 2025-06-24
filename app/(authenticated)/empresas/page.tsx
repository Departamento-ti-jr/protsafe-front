import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenSquare, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function EmpresasPage() {
  const empresas = [
    { codigo: "001", nome: "Amazônia Planos de Saúde LTDA" },
    { codigo: "002", nome: "Hospital Marechal Cândido Rondon LTDA" },
    { codigo: "003", nome: "Humana Saúde Nordeste LTDA" },
    { codigo: "004", nome: "Casa de Saúde São Bernardo LTDA" },
    { codigo: "005", nome: "Humana Saúde LTDA" },
    { codigo: "006", nome: "Leve Saúde Operadora de Planos de Saúde S.A" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Empresas</h1>
      </div>

      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar empresas..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="ml-auto">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">Código</TableHead>
              <TableHead className="font-medium text-gray-900">Nome</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empresas.map((empresa) => (
              <TableRow key={empresa.codigo} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{empresa.codigo}</TableCell>
                <TableCell className="text-gray-600">{empresa.nome}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/empresas/editar/${empresa.codigo}`}>
                    <Button variant="ghost" size="icon">
                      <PenSquare className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="icon" disabled>
          &lt;
        </Button>
        <Button size="sm">1</Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="icon">
          &gt;
        </Button>
      </div>
    </div>
  )
}
