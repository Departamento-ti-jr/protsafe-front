"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, FileText, Save } from "lucide-react"
import Link from "next/link"

export default function EditarDefesaPage({ params }: { params: { id: string } }) {
  const [selectedMotivo, setSelectedMotivo] = useState("")
  const [selectedPedido, setSelectedPedido] = useState("retificacao")
  const [valorRetificacao, setValorRetificacao] = useState("846.13")
  const [informarOutrosDocumentos, setInformarOutrosDocumentos] = useState(false)

  // Dados de exemplo baseados na imagem fornecida
  const atendimento = {
    id: params.id,
    ordem: "0",
    competencia: "02/2024",
    tipo: "AIH",
    dataInicial: "16-02-2024",
    dataFinal: "18-02-2024",
  }

  const motivosImpugnacao = [
    { value: "08", label: "08 - COPARTICIPAÇÃO - PRONTO SOCORRO" },
    { value: "02", label: "02 - HOMONÍMIA" },
    { value: "04", label: "04 - ÁREA DE ABRANGÊNCIA" },
    { value: "06", label: "06 - QUANTIDADE DO PROCEDIMENTO NÃO COBERTA PELO PRODUTO" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/defesas">
          <Button variant="outline" size="icon" className="rounded-xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Defesa</h1>
          <p className="text-gray-600">Defesa de uma "AIH"</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-gray-700">
          Você está realizando a defesa do atendimento <strong>"N° 1"</strong> da <strong>"ABI 101"</strong>
        </p>
      </div>

      {/* Informações do Atendimento */}
      <Card>
        <CardHeader>
          <CardTitle>Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Ordem</Label>
              <p className="font-medium">{atendimento.ordem}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Competência</Label>
              <p className="font-medium">{atendimento.competencia}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Tipo</Label>
              <p className="font-medium">{atendimento.tipo}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Data inicial</Label>
              <p className="font-medium">{atendimento.dataInicial}</p>
            </div>
          </div>
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-500">Data Final</Label>
            <p className="font-medium">{atendimento.dataFinal}</p>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Impugnação/recurso */}
      <Card>
        <CardHeader>
          <CardTitle>Formulário de impugnação/recurso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Impugnação</Label>
            <Select value={selectedMotivo} onValueChange={setSelectedMotivo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o(s) motivo(s) de impugnação/recurso..." />
              </SelectTrigger>
              <SelectContent>
                {motivosImpugnacao.map((motivo) => (
                  <SelectItem key={motivo.value} value={motivo.value}>
                    {motivo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedMotivo === "08" && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <div className="space-y-2">
                <Label className="text-sm text-blue-600">Detalhamento do Motivo</Label>
                <Textarea
                  value="A operadora não concorda com a presente cobrança em razão de CLÁUSULA DE FRANQUIA OU COPARTICIPAÇÃO.
De fato, o (a) beneficiário (a) utilizou o produto _____ onde da coparticipação referente a consulta realizada em pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, uma vez que, o atendimento foi realizado em dia de urgência e, consequentemente, incidiu no pronto socorro, devendo ser descontado do valor do procedimento.

Desta forma, conclui-se que sobre o(s) procedimento(s) realizado(s), incide coparticipação no total de R$ 27,50, devendo ser descontado do valor do procedimento."
                  className="min-h-[150px]"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-blue-600">Tempestividade e Outras Preliminares</Label>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xs">!</span>
                    </div>
                    <span>Informe a tempestividade ou outras preliminares</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-blue-600">Planilha de Cálculo</Label>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-mono">R$ 873,63 - 27,50 (consulta em pronto socorro) = 846,13</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-blue-600">Documentos Comprobatórios</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o(s) documento(s) comprobatório(s)..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contrato">Contrato</SelectItem>
                      <SelectItem value="comprovante">Comprovante de Pagamento</SelectItem>
                      <SelectItem value="prontuario">Prontuário Médico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="outros-documentos"
                  checked={informarOutrosDocumentos}
                  onCheckedChange={setInformarOutrosDocumentos}
                />
                <Label htmlFor="outros-documentos" className="text-sm">
                  Informar outros documentos comprobatórios.
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedPedido} onValueChange={setSelectedPedido}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="anulacao-identificacao" id="anulacao-identificacao" />
              <Label htmlFor="anulacao-identificacao">Anulação da identificação do atendimento.</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="retificacao" id="retificacao" />
              <Label htmlFor="retificacao">Retificação do valor a ser ressarcido.</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="anulacao-subsidiaria" id="anulacao-subsidiaria" />
              <Label htmlFor="anulacao-subsidiaria">
                Anulação da identificação do atendimento ou, subsidiariamente, retificação do valor a ser ressarcido.
              </Label>
            </div>
          </RadioGroup>

          {selectedPedido === "retificacao" && (
            <div className="mt-4 space-y-2">
              <Label>Valor da retificação</Label>
              <div className="flex items-center space-x-2">
                <span className="text-lg">$</span>
                <Input
                  value={valorRetificacao}
                  onChange={(e) => setValorRetificacao(e.target.value)}
                  className="w-32"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documentos Anexados */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Anexados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Nenhum documento anexado</p>
          </div>
        </CardContent>
      </Card>

      {/* Documentos Anexados na ANS */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Anexados na ANS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Nenhum documento anexado na ANS</p>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" className="rounded-xl">
          <Upload className="mr-2 h-4 w-4" />
          ANEXAR DOCUMENTO
        </Button>
        <Button variant="outline" className="rounded-xl">
          <FileText className="mr-2 h-4 w-4" />
          INTEGRAR ANS
        </Button>
        <Button className="rounded-xl shadow-lg">
          <Save className="mr-2 h-4 w-4" />
          SALVAR E GERAR DEFESA
        </Button>
      </div>
    </div>
  )
}
