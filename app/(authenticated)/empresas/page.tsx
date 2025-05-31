import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenSquare, Plus, Search } from "lucide-react"

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
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-resus-secondary to-resus-primary bg-clip-text text-transparent">
          Empresas
        </h1>
        <p className="text-resus-secondary/70">Aqui mostra uma lista de todas empresas cadastradas</p>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-resus-primary" />
          <Input
            placeholder="Pesquisar empresas..."
            className="pl-10 border-resus-primary/30 focus:border-resus-primary focus:ring-resus-primary/20 rounded-xl bg-white/50 backdrop-blur-sm"
          />
        </div>
        <div className="ml-auto">
          <Button className="rounded-xl shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-resus-primary/10 to-resus-accent/10 border-b border-resus-primary/20">
              <TableHead className="font-semibold text-resus-secondary">Código</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Nome</TableHead>
              <TableHead className="font-semibold text-resus-secondary text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empresas.map((empresa) => (
              <TableRow
                key={empresa.codigo}
                className="hover:bg-gradient-to-r hover:from-resus-primary/5 hover:to-resus-accent/5 transition-all duration-200 border-b border-gray-100"
              >
                <TableCell className="font-medium text-resus-secondary">{empresa.codigo}</TableCell>
                <TableCell className="text-resus-secondary">{empresa.nome}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <PenSquare className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação modernizada */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="icon" disabled className="rounded-xl">
          &lt;
        </Button>
        <Button size="sm" className="rounded-xl">
          1
        </Button>
        <Button variant="outline" size="sm" className="rounded-xl">
          2
        </Button>
        <Button variant="outline" size="sm" className="rounded-xl">
          3
        </Button>
        <Button variant="outline" size="icon" className="rounded-xl">
          &gt;
        </Button>
      </div>
    </div>
  )
}
