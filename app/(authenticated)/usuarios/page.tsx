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
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-resus-secondary to-resus-primary bg-clip-text text-transparent">
          Usuários
        </h1>
        <p className="text-resus-secondary/70">Gerencie todos os usuários do sistema</p>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-resus-primary" />
          <Input
            placeholder="Pesquisar usuários..."
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
              <TableHead className="font-semibold text-resus-secondary">Email</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Perfil</TableHead>
              <TableHead className="font-semibold text-resus-secondary text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow
                key={usuario.codigo}
                className="hover:bg-gradient-to-r hover:from-resus-primary/5 hover:to-resus-accent/5 transition-all duration-200 border-b border-gray-100"
              >
                <TableCell className="font-medium text-resus-secondary">{usuario.codigo}</TableCell>
                <TableCell className="text-resus-secondary">{usuario.nome}</TableCell>
                <TableCell className="text-resus-secondary">{usuario.email}</TableCell>
                <TableCell className="text-resus-secondary">{usuario.perfil}</TableCell>
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
