"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Eye, Save } from "lucide-react"
import Link from "next/link"
import { ABINavigationBreadcrumb } from "@/components/abi-navigation-breadcrumb"

interface AtendimentoDetalhes {
  id: string
  numeroOrdem: string
  competencia: string
  valorTotal: number
  tipo: string
  numeroAtendimento: string
  caraterAtendimento: string
  dataInicial: string
  dataFim: string
  beneficiario: {
    codigo: string
    codigoCCO: string
    dataNascimento: string
  }
  procedimentos: Array<{
    id: string
    tipo: string
    codigo: string
    quantidade: number
    valor: number
    descricao: string
  }>
}

export default function AtendimentoDetalhesPage({
  params,
}: {
  params: Promise<{ id: string; atendimentoId: string }>
}) {
  const router = useRouter()
  const [abiId, setAbiId] = useState<string>("")
  const [atendimentoId, setAtendimentoId] = useState<string>("")
  const [atendimento, setAtendimento] = useState<AtendimentoDetalhes | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [observacoes, setObservacoes] = useState("")
  const [documentos, setDocumentos] = useState("")
  const [protocolo, setProtocolo] = useState("")

  useEffect(() => {
    params.then((resolved) => {
      setAbiId(resolved.id)
      setAtendimentoId(resolved.atendimentoId)
      fetchAtendimento(resolved.atendimentoId)
    })
  }, [params])

  const fetchAtendimento = async (atendimentoId: string) => {
    try {
      // Simulando dados do atendimento baseado na imagem
      const mockAtendimento: AtendimentoDetalhes = {
        id: atendimentoId,
        numeroOrdem: "1",
        competencia: "042024",
        valorTotal: 431.64,
        tipo: "AIH",
        numeroAtendimento: "3224103199515",
        caraterAtendimento: "2",
        dataInicial: "01-01-0001",
        dataFim: "14-03-2024",
        beneficiario: {
          codigo: "000000000000000000001003971608",
          codigoCCO: "060935737209",
          dataNascimento: "03-02-1977",
        },
        procedimentos: [
          {
            id: "1",
            tipo: "P",
            codigo: "0303010010",
            quantidade: 1,
            valor: 431.64,
            descricao: "TRATAMENTO DE DENGUE CLÁSSICA",
          },
        ],
      }

      setAtendimento(mockAtendimento)
    } catch (err) {
      setError("Erro ao carregar os detalhes do atendimento.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    // Implementar salvamento
    console.log("Salvando:", { observacoes, documentos, protocolo })
  }

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (error || !atendimento) {
    return <div className="p-6 text-red-600">{error || "Não foi possível encontrar os dados do atendimento."}</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ABINavigationBreadcrumb currentStep="atendimento" abiId={abiId} atendimentoId={atendimentoId} />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href={`/abis/detalhes/${abiId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ABI</h1>
            <p className="text-sm text-gray-600">Confira os detalhes da "ABI 102"</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Você está visualizando o atendimento "{atendimento.tipo}" de "Nº {atendimento.numeroOrdem}"
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nº Ordem</p>
                <p className="font-semibold">{atendimento.numeroOrdem}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Competência</p>
                <p className="font-semibold">{atendimento.competencia}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Valor Total</p>
                <p className="font-semibold">
                  R$ {atendimento.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atendimento identificado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Tipo</p>
                <p>{atendimento.tipo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Nº Atendimento</p>
                <p className="font-mono">{atendimento.numeroAtendimento}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Caráter Atendimento</p>
                <p>{atendimento.caraterAtendimento}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Data Inicial</p>
                <p>{atendimento.dataInicial}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data Fim</p>
                <p>{atendimento.dataFim}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beneficiário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Código</p>
                <p className="font-mono text-sm">{atendimento.beneficiario.codigo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Código CCO</p>
                <p className="font-mono">{atendimento.beneficiario.codigoCCO}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data Nascimento</p>
                <p>{atendimento.beneficiario.dataNascimento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações para Controle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-teal-600 mb-2 block">Observações</label>
                <Textarea
                  placeholder="Se necessário, informe uma observação aqui..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-teal-600 mb-2 block">Documentos</label>
                <Textarea
                  placeholder="Anote aqui os documentos que estão faltando ou se..."
                  value={documentos}
                  onChange={(e) => setDocumentos(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-teal-600 mb-2 block">Nº Protocolo</label>
                <Textarea
                  placeholder="Nº Protocolo da defesa..."
                  value={protocolo}
                  onChange={(e) => setProtocolo(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Procedimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {atendimento.procedimentos.map((procedimento) => (
                    <TableRow key={procedimento.id}>
                      <TableCell>{procedimento.tipo}</TableCell>
                      <TableCell className="font-mono">{procedimento.codigo}</TableCell>
                      <TableCell>{procedimento.quantidade}</TableCell>
                      <TableCell>
                        R$ {procedimento.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell>{procedimento.descricao}</TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/abis/detalhes/${abiId}/atendimento/${atendimentoId}/procedimento/${procedimento.id}`}
                        >
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
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            SALVAR
          </Button>
        </div>
      </div>
    </div>
  )
}
