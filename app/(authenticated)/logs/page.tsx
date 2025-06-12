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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Logs</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar logs..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
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
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Até
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>

          <Button>Buscar</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">ID</TableHead>
              <TableHead className="font-medium text-gray-900">Data</TableHead>
              <TableHead className="font-medium text-gray-900">Hora</TableHead>
              <TableHead className="font-medium text-gray-900">Descrição</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{log.id}</TableCell>
                <TableCell className="text-gray-600">{log.data}</TableCell>
                <TableCell className="text-gray-600">{log.hora}</TableCell>
                <TableCell className="text-gray-600">{log.descricao}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/logs/${log.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
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
