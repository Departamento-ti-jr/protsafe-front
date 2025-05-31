import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Eye, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"

export default function LogsPage() {
  // Dados de exemplo baseados na imagem fornecida
  const logs = [
    {
      id: "23497",
      data: "01-05-2025",
      hora: "09:01:24",
      descricao: "Defesa Nº 0 para o atendimento de Nº 51078 foi inserido pelo usuario: Camila!",
    },
    {
      id: "23496",
      data: "30-04-2025",
      hora: "15:22:10",
      descricao: "Documento comprobatório adicionado pelo usuario: Beatriz",
    },
    {
      id: "23495",
      data: "29-04-2025",
      hora: "11:05:33",
      descricao: "Novo usuário cadastrado pelo usuario: Administrador",
    },
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-resus-secondary to-resus-primary bg-clip-text text-transparent">
          Logs
        </h1>
        <p className="text-resus-secondary/70">Histórico de atividades do sistema</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center py-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-resus-primary" />
          <Input
            placeholder="Buscar logs..."
            className="pl-10 border-resus-primary/30 focus:border-resus-primary focus:ring-resus-primary/20 rounded-xl bg-white/50 backdrop-blur-sm"
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <CalendarIcon className="mr-2 h-4 w-4" />
                De
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Até
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>

          <Button className="rounded-xl shadow-lg">Buscar</Button>
        </div>
      </div>

      <div className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-resus-primary/10 to-resus-accent/10 border-b border-resus-primary/20">
              <TableHead className="font-semibold text-resus-secondary">ID</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Data</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Hora</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Descrição</TableHead>
              <TableHead className="font-semibold text-resus-secondary text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow
                key={log.id}
                className="hover:bg-gradient-to-r hover:from-resus-primary/5 hover:to-resus-accent/5 transition-all duration-200 border-b border-gray-100"
              >
                <TableCell className="font-medium text-resus-secondary">{log.id}</TableCell>
                <TableCell className="text-resus-secondary">{log.data}</TableCell>
                <TableCell className="text-resus-secondary">{log.hora}</TableCell>
                <TableCell className="text-resus-secondary">{log.descricao}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/logs/${log.id}`}>
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
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
