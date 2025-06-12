import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function ABIsPage() {
  // Dados de exemplo baseados na imagem fornecida
  const abis = [
    {
      abi: "101",
      numeroOficio: "8",
      numeroProcesso: "339100110117/2025-45",
      nomeOperadora: "AMAZÔNIA PLANOS DE SAÚDE LTDA",
      cnpj: "16.926.969/0001-28",
      dataHora: "26-03-2025 00:00",
      status: "Aberto",
    },
    {
      abi: "101",
      numeroOficio: "215",
      numeroProcesso: "339100112230/2025-57",
      nomeOperadora: "HOSPITAL MARECHAL CÂNDIDO RONDON LTDA",
      cnpj: "81.564.346/0001-14",
      dataHora: "26-03-2025 00:00",
      status: "Aberto",
    },
    {
      abi: "101",
      numeroOficio: "220",
      numeroProcesso: "339100112235/2025-80",
      nomeOperadora: "HUMANA SAÚDE NORDESTE LTDA",
      cnpj: "00.361.325/0001-08",
      dataHora: "26-03-2025 00:00",
      status: "Aberto",
    },
    {
      abi: "101",
      numeroOficio: "137",
      numeroProcesso: "339100111150/2025-00",
      nomeOperadora: "CASA DE SAÚDE SÃO BERNARDO LTDA",
      cnpj: "31.488.208/0001-25",
      dataHora: "26-03-2025 00:00",
      status: "Aberto",
    },
    {
      abi: "101",
      numeroOficio: "219",
      numeroProcesso: "339100112234/2025-35",
      nomeOperadora: "HUMANA SAÚDE LTDA",
      cnpj: "95.642.179/0001-97",
      dataHora: "26-03-2025 00:00",
      status: "Aberto",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">ABIs</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar ABIs..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <Select defaultValue="todos">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="aberto">Aberto</SelectItem>
              <SelectItem value="fechado">Fechado</SelectItem>
              <SelectItem value="em-andamento">Em Andamento</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nova ABI
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">ABI</TableHead>
              <TableHead className="font-medium text-gray-900">Número do ofício</TableHead>
              <TableHead className="font-medium text-gray-900">Número do processo</TableHead>
              <TableHead className="font-medium text-gray-900">Nome da operadora / CNPJ</TableHead>
              <TableHead className="font-medium text-gray-900">Data / Hora registro</TableHead>
              <TableHead className="font-medium text-gray-900">Status</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {abis.map((abi, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{abi.abi}</TableCell>
                <TableCell className="text-gray-600">{abi.numeroOficio}</TableCell>
                <TableCell className="font-mono text-sm text-gray-600">{abi.numeroProcesso}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">{abi.nomeOperadora}</div>
                    <div className="text-sm text-gray-500">{abi.cnpj}</div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{abi.dataHora}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                    {abi.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/abis/detalhes/${abi.abi}`}>
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
          &lt;&lt;
        </Button>
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
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
        <span className="px-2 text-gray-500">...</span>
        <Button variant="outline" size="sm">
          19
        </Button>
        <Button variant="outline" size="icon">
          &gt;
        </Button>
        <Button variant="outline" size="icon">
          &gt;&gt;
        </Button>
      </div>
    </div>
  )
}
