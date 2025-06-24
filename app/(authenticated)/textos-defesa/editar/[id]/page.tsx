"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Printer } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function EditarTextoDefesaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = React.use(params)

  // Dados de exemplo baseados na imagem fornecida
  const [textoDefesa, setTextoDefesa] = useState({
    id: id,
    nome: id === "06" ? "06 – QUANTIDADE DO PROCEDIMENTO NÃO COBERTA PELO PRODUTO" : "",
    texto:
      id === "06"
        ? `A operadora entende que a cobrança da presente AIH/APAC é indevida porque a quantidade do PROCEDIMENTO REALIZADO NO ATENDIMENTO IDENTIFICADO ULTRAPASSA A MÁXIMA COBERTA PELO PRODUTO, conforme prevê a Cláusula ____/ DUT_____.

Conforme documentos anexos, o(a) beneficiário(a) realizou o procedimento _________, o mesmo ora cobrado, em _________ e, consequentemente atingiu a quantidade cobertura contratualmente.

Por essa razão, o ressarcimento ao SUS não é devido.`
        : "",
  })

  const handleSave = () => {
    // Aqui seria implementada a lógica para salvar o texto de defesa
    alert("Texto de defesa salvo com sucesso!")
    router.push("/textos-defesa")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/textos-defesa">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Editar texto de defesa</h1>
          <p className="text-gray-600">Aqui é mostrado os dados do texto de defesa</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-gray-700">
          Você selecionou o texto de defesa <strong>"{textoDefesa.nome}"</strong> para editar
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={textoDefesa.nome}
              onChange={(e) => setTextoDefesa({ ...textoDefesa, nome: e.target.value })}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="texto">Texto de Defesa</Label>
            <Textarea
              id="texto"
              value={textoDefesa.texto}
              onChange={(e) => setTextoDefesa({ ...textoDefesa, texto: e.target.value })}
              className="min-h-[200px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
