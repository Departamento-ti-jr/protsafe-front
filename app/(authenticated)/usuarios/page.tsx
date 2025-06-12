import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenSquare, Plus, Search } from "lucide-react"

export default function UsuariosPage() {
  const usuarios = [
    { codigo: "001", nome: "João Silva", email: "joao@resus.com", perfil: "Administrador" },
    { codigo: "002", nome: "Maria Santos", email: "maria@resus.com", perfil: "Usuário" },
    { codigo: "003", nome: "Pedro Costa", email: "pedro@resus.com", perfil: "Usuário" },
    { codigo: "004", nome: "Ana Oliveira", email: "ana@resus.com", perfil: "Administrador" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Usuários</h1>
      </div>

      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar usuários..."
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
              <TableHead className="font-medium text-gray-900">Email</TableHead>
              <TableHead className="font-medium text-gray-900">Perfil</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.codigo} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{usuario.codigo}</TableCell>
                <TableCell className="text-gray-600">{usuario.nome}</TableCell>
                <TableCell className="text-gray-600">{usuario.email}</TableCell>
                <TableCell className="text-gray-600">{usuario.perfil}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <PenSquare className="h-4 w-4" />
                  </Button>
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
