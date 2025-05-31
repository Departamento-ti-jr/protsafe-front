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
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-resus-secondary to-resus-primary bg-clip-text text-transparent">
          ABIs
        </h1>
        <p className="text-resus-secondary/70">Aqui você encontra todas as ABIs disponíveis</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center py-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-resus-primary" />
          <Input
            placeholder="Difícil de encontrar? Digite aqui que vamos encontrar para você..."
            className="pl-10 border-resus-primary/30 focus:border-resus-primary focus:ring-resus-primary/20 rounded-xl bg-white/50 backdrop-blur-sm"
          />
        </div>
        <div className="flex gap-3">
          <Select defaultValue="todos">
            <SelectTrigger className="w-full md:w-[180px] border-resus-primary/30 rounded-xl">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="aberto">Aberto</SelectItem>
              <SelectItem value="fechado">Fechado</SelectItem>
              <SelectItem value="em-andamento">Em Andamento</SelectItem>
            </SelectContent>
          </Select>
          <Button className="rounded-xl shadow-lg">
            <Plus className="mr-2 h-4 w-4" /> Nova ABI
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-resus-primary/10 to-resus-accent/10 border-b border-resus-primary/20">
              <TableHead className="font-semibold text-resus-secondary">ABI</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Número do ofício</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Número do processo</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Nome da operadora / CNPJ</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Data / Hora registro</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Status</TableHead>
              <TableHead className="font-semibold text-resus-secondary text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {abis.map((abi, index) => (
              <TableRow
                key={index}
                className="hover:bg-gradient-to-r hover:from-resus-primary/5 hover:to-resus-accent/5 transition-all duration-200 border-b border-gray-100"
              >
                <TableCell className="font-medium text-resus-secondary">{abi.abi}</TableCell>
                <TableCell className="text-resus-secondary">{abi.numeroOficio}</TableCell>
                <TableCell className="font-mono text-sm text-resus-secondary">{abi.numeroProcesso}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-resus-secondary">{abi.nomeOperadora}</div>
                    <div className="text-sm text-resus-secondary/60">{abi.cnpj}</div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-resus-secondary">{abi.dataHora}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                    {abi.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/abis/detalhes/${abi.abi}`}>
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
          &lt;&lt;
        </Button>
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
        <Button variant="outline" size="sm" className="rounded-xl">
          4
        </Button>
        <Button variant="outline" size="sm" className="rounded-xl">
          5
        </Button>
        <span className="px-2 text-resus-secondary/60">...</span>
        <Button variant="outline" size="sm" className="rounded-xl">
          19
        </Button>
        <Button variant="outline" size="icon" className="rounded-xl">
          &gt;
        </Button>
        <Button variant="outline" size="icon" className="rounded-xl">
          &gt;&gt;
        </Button>
      </div>

      {/* Botão flutuante */}
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="h-12 w-12 rounded-full bg-resus-secondary hover:bg-resus-primary shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
