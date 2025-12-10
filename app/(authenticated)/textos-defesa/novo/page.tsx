"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from 'lucide-react'
import Link from "next/link"
import { TextosDefesaService } from "@/lib/services/textos-defesa.service"
import { useToast } from "@/hooks/use-toast"

// --- IMPORTS DO CODEMIRROR ---
import CodeMirror from "@uiw/react-codemirror"
import { html } from "@codemirror/lang-html"

export default function NovoTextoDefesaPage() {
  const [formData, setFormData] = useState({
    nome: "",
    texto: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!formData.nome.trim()) {
      setError("Nome é obrigatório.")
      return
    }

    if (!formData.texto.trim()) {
      setError("Texto de defesa é obrigatório.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      await TextosDefesaService.create({
        nome: formData.nome.trim(),
        texto: formData.texto.trim(),
      })

      setSuccess(true)
      setFormData({ nome: "", texto: "" })
      
      toast({
        title: "Sucesso!",
        description: "Texto de defesa criado com sucesso.",
      })

      setTimeout(() => {
        router.push("/textos-defesa")
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar texto de defesa.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
    setError(null)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/textos-defesa">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Novo Texto de Defesa</h1>
      </div>

      <p className="text-sm text-muted-foreground">Preencha os campos para cadastrar um novo texto de defesa</p>

      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Texto de Defesa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Texto de Defesa</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite o nome do texto de defesa"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="texto">Conteúdo do Texto de Defesa (HTML)</Label>

            <CodeMirror
              value={formData.texto}
              height="400px"
              theme="light"
              extensions={[html({ matchClosingTags: true, autoCloseTags: true })]}
              onChange={(value) => handleInputChange("texto", value)}
              className="rounded border border-gray-300"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">Texto de defesa cadastrado com sucesso!</p>}

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={loading || !formData.nome.trim() || !formData.texto.trim()}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Cadastrando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Cadastrar Texto de Defesa
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
