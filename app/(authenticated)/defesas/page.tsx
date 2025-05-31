import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenSquare, Plus, Search, Filter } from "lucide-react"
import Link from "next/link"

export default function DefesasPage() {
  const defesas = [
    {
      abi: "101",
      numeroOficio: "137",
      nomeOperadora: "CASA DE SAÚDE SÃO BERNARDO LTDA",
      cnpj: "31.488.208/0001-25",
      nOrder: "1",
      atendimento: "3224103278891",
      data: "22-05-2025 11:13",
    },
    {
      abi: "101",
      numeroOficio: "8",
      nomeOperadora: "AMAZÔNIA PLANOS DE SAÚDE LTDA",
      cnpj: "16.926.969/0001-28",
      nOrder: "1",
      atendimento: "1524100650534",
      data: "21-05-2025 14:53",
    },
    {
      abi: "97",
      numeroOficio: "375",
      nomeOperadora: "UNIHOSP SERVIÇOS DE SAÚDE LTDA",
      cnpj: "04.083.773/0001-30",
      nOrder: "57",
      atendimento: "2123204962692",
      data: "19-05-2025 14:41",
    },
    {
      abi: "97",
      numeroOficio: "224",
      nomeOperadora: "HUMANA ASSISTÊNCIA MÉDICA LTDA",
      cnpj: "00.361.325/0001-08",
      nOrder: "2",
      atendimento: "2123101711500",
      data: "19-05-2025 14:21",
    },
    {
      abi: "101",
      numeroOficio: "379",
      nomeOperadora: "UNIMED BELÉM COOPERATIVA DE TRABALHO MÉDICO",
      cnpj: "04.201.372/0001-37",
      nOrder: "164",
      atendimento: "1524103928996",
      data: "06-05-2025 15:27",
    },
  ]

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Defesas</h1>
          <p className="text-gray-600">Gerencie e acompanhe todas as defesas jurídicas</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Defesa
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Difícil de encontrar? Digite aqui que vamos encontrar para você..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">ABI</TableHead>
              <TableHead className="font-medium text-gray-900">Número do ofício</TableHead>
              <TableHead className="font-medium text-gray-900">Nome da operadora / CNPJ</TableHead>
              <TableHead className="font-medium text-gray-900">N° Order</TableHead>
              <TableHead className="font-medium text-gray-900">Atendimento</TableHead>
              <TableHead className="font-medium text-gray-900">Data</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {defesas.map((defesa, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{defesa.abi}</TableCell>
                <TableCell className="text-gray-600">{defesa.numeroOficio}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">{defesa.nomeOperadora}</div>
                    <div className="text-sm text-gray-500">{defesa.cnpj}</div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{defesa.nOrder}</TableCell>
                <TableCell className="font-mono text-sm text-gray-600">{defesa.atendimento}</TableCell>
                <TableCell className="text-sm text-gray-600">{defesa.data}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/defesas/editar/${defesa.atendimento}`}>
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

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        <Button variant="outline" size="icon" disabled>
          &lt;&lt;
        </Button>
        <Button variant="outline" size="icon" disabled>
          &lt;
        </Button>
        <Button size="sm" className="bg-purple-main text-white">
          1
        </Button>
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
        <span className="text-gray-500">...</span>
        <Button variant="outline" size="sm">
          1794
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
