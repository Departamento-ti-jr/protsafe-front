import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, Search } from "lucide-react"
import Link from "next/link"

export default function ABIDetalhesPage({ params }: { params: { id: string } }) {
  // Dados de exemplo baseados na imagem fornecida
  const abiDetalhes = {
    id: params.id,
    numeroProcesso: "339101101107/2025-45",
    nomeEmpresa: "AMAZÔNIA PLANOS DE SAÚDE LTDA",
    cnpj: "16.926.696/001-28",
    status: "Aberto",
    valorProcesso: "R$ 79.070,96",
    quantidadeProcessos: 24,
  }

  const atendimentos = [
    {
      ordem: "1",
      tipo: "Tratamento",
      numeroProcesso: "339101101107/2025-45",
      idAtendimento: "51078",
      competencia: "01/2025",
      dataEmissao: "26/03/2025",
      procedimentoPrincipal: "Consulta médica",
      status: "Defendido",
    },
    {
      ordem: "2",
      tipo: "Tratamento",
      numeroProcesso: "339101101107/2025-45",
      idAtendimento: "51079",
      competencia: "01/2025",
      dataEmissao: "26/03/2025",
      procedimentoPrincipal: "Exame laboratorial",
      status: "Defendido",
    },
    {
      ordem: "3",
      tipo: "Tratamento",
      numeroProcesso: "339101101107/2025-45",
      idAtendimento: "51080",
      competencia: "01/2025",
      dataEmissao: "26/03/2025",
      procedimentoPrincipal: "Procedimento cirúrgico",
      status: "Defendido",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/abis">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">ABI {abiDetalhes.id}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Processo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Número do Processo</p>
              <p className="font-mono">{abiDetalhes.numeroProcesso}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Nome da Empresa</p>
              <p>{abiDetalhes.nomeEmpresa}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">CNPJ</p>
              <p>{abiDetalhes.cnpj}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                {abiDetalhes.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Valor do Processo</p>
              <p className="font-semibold text-lg">{abiDetalhes.valorProcesso}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Quantidade de Processos</p>
              <p className="font-semibold">{abiDetalhes.quantidadeProcessos}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Atendimentos</CardTitle>
          <div className="flex items-center py-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Buscar atendimentos..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Ordem</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Número do Processo</TableHead>
                  <TableHead>ID Atendimento</TableHead>
                  <TableHead>Competência</TableHead>
                  <TableHead>Data de Emissão</TableHead>
                  <TableHead>Procedimento Principal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atendimentos.map((atendimento) => (
                  <TableRow key={atendimento.ordem}>
                    <TableCell className="font-medium">{atendimento.ordem}</TableCell>
                    <TableCell>{atendimento.tipo}</TableCell>
                    <TableCell className="font-mono text-sm">{atendimento.numeroProcesso}</TableCell>
                    <TableCell>{atendimento.idAtendimento}</TableCell>
                    <TableCell>{atendimento.competencia}</TableCell>
                    <TableCell>{atendimento.dataEmissao}</TableCell>
                    <TableCell>{atendimento.procedimentoPrincipal}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {atendimento.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
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
            <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              1
            </Button>
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
        </CardContent>
      </Card>
    </div>
  )
}
