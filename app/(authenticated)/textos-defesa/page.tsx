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
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-resus-secondary to-resus-primary bg-clip-text text-transparent">
          Textos de defesa
        </h1>
        <p className="text-resus-secondary/70">Aqui estão os textos de defesa disponíveis</p>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-resus-primary" />
          <Input
            placeholder="Difícil de encontrar? Digite aqui que vamos encontrar para você..."
            className="pl-10 border-resus-primary/30 focus:border-resus-primary focus:ring-resus-primary/20 rounded-xl bg-white/50 backdrop-blur-sm"
          />
        </div>
        <div className="ml-auto">
          <Button className="rounded-xl shadow-lg">
            <Plus className="mr-2 h-4 w-4" /> Novo Texto
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-resus-primary/10 to-resus-accent/10 border-b border-resus-primary/20">
              <TableHead className="font-semibold text-resus-secondary">Nome</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Texto</TableHead>
              <TableHead className="font-semibold text-resus-secondary text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {textosDefesa.map((texto) => (
              <TableRow
                key={texto.id + texto.nome}
                className="hover:bg-gradient-to-r hover:from-resus-primary/5 hover:to-resus-accent/5 transition-all duration-200 border-b border-gray-100"
              >
                <TableCell className="font-medium text-resus-secondary">{texto.nome}</TableCell>
                <TableCell>
                  <div
                    className="text-sm text-resus-secondary/70 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: texto.texto }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/textos-defesa/editar/${texto.id}`}>
                    <Button variant="ghost" size="icon" className="rounded-xl">
                      <PenSquare className="h-4 w-4" />
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
