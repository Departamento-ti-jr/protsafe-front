import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenSquare, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function TextosDefesaPage() {
  // Dados de exemplo baseados na imagem fornecida
  const textosDefesa = [
    {
      id: "06",
      nome: "06 – QUANTIDADE DO PROCEDIMENTO NÃO COBERTA PELO PRODUTO",
      texto:
        '<p>A operadora entende que a cobrança da presente AIH/APAC é indevida porque a quantidade do&nbsp;<strong><span style="background-color: transparent;">PROCEDIMENTO REALIZADO NO ATENDIMENTO IDENT...',
    },
    {
      id: "02",
      nome: "02 – HOMONÍMIA",
      texto:
        "<p>A operadora não concorda com a presente cobrança pelo motivo do (a) beneficiário (a) identificado não reconhecer o fato de ter realizado o procedimento, conforme declaração em anexo.</p><p><br></p>...",
    },
    {
      id: "04",
      nome: "04 – ÁREA DE ABRANGÊNCIA",
      texto:
        "<p>A operadora entende que a cobrança da presente AIH/APAC é indevida porque se trata de <strong>PROCEDIMENTO REALIZADO FORA DA ABRANGÊNCIA </strong></p><p><br></p><p>Com efeito, conforme detalhamento...",
    },
    {
      id: "07",
      nome: "07 – ATENDIMENTO JÁ PAGO",
      texto:
        "<p>A operadora entende que a cobrança da presente AIH/APAC é indevida porque o beneficiário realizou procedimento idêntico, na mesma data do atendimento pelo SUS, sendo esse já pago pela operadora, co...",
    },
    {
      id: "37",
      nome: "37 – BENEFICIÁRIO EXCLUÍDO NA ÉPOCA DO ATENDIMENTO",
      texto:
        "<p>A operadora entende que a cobrança da presente AIH é indevida porque se trata de <strong>BENEFICIÁRIO EXCLUÍDO À ÉPOCA DO ATENDIMENTO</strong>. </p><p><br></p><p>Conforme documentação em anexo, o (...",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Textos de defesa</h1>
      </div>

      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar textos..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="ml-auto">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Texto
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">Nome</TableHead>
              <TableHead className="font-medium text-gray-900">Texto</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {textosDefesa.map((texto) => (
              <TableRow key={texto.id + texto.nome} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{texto.nome}</TableCell>
                <TableCell>
                  <div
                    className="text-sm text-gray-600 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: texto.texto }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/textos-defesa/editar/${texto.id}`}>
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
