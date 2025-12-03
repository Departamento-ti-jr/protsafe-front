"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Printer, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ApiService, type TextoDefesa } from "@/lib/api"
import { TextosDefesaService } from "@/lib/services/textos-defesa.service"
import { useToast } from "@/hooks/use-toast"

export default function EditarTextoDefesaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = React.use(params)

  const [textoDefesa, setTextoDefesa] = useState<TextoDefesa | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadTextoDefesa()
  }, [id])

  const loadTextoDefesa = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TextosDefesaService.getById(id)
      setTextoDefesa(data)
    } catch (err) {
      setError("Erro ao carregar texto de defesa. Tente novamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!textoDefesa) return

    try {
      setSaving(true)
      await TextosDefesaService.update(id, textoDefesa)
      toast({
        title: "Sucesso!",
        description: "Texto de defesa atualizado com sucesso.",
      })
      router.push("/textos-defesa")
    } catch (err) {
      alert("Erro ao salvar texto de defesa. Tente novamente.")
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof TextoDefesa, value: string) => {
    if (!textoDefesa) return
    setTextoDefesa({ ...textoDefesa, [field]: value })
  }

  if (loading) {
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
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-gray-600">Carregando textos de defesa...</span>
        </div>
      </div>
    )
  }

  if (error || !textoDefesa) {
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
            <p className="text-gray-600">Erro ao carregar dados</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <p className="text-red-600">{error || "Texto de defesa não encontrado"}</p>
          <Button onClick={loadTextoDefesa}>Tentar novamente</Button>
        </div>
      </div>
    )
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
              onChange={(e) => handleInputChange("nome", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="texto">Texto de Defesa</Label>
            <Textarea
              id="texto"
              value={textoDefesa.texto}
              onChange={(e) => handleInputChange("texto", e.target.value)}
              className="min-h-[200px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
