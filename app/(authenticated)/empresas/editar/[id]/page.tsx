"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building2, Lock, Save, User } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface PageProps {
  params: {
    id: Promise<{ id: string }>
  }
}

export default function EditarEmpresaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = React.use(params)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - em produção viria de uma API
  const [empresa, setEmpresa] = useState({
    id: id,
    nome: "CloudMed",
    codigoInterno: "123 0001",
    tipo: "Administrador",
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Redirecionar de volta para a lista
    router.push("/empresas")
  }

  const handleBack = () => {
    router.push("/empresas")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Editar empresa</h1>
          <p className="text-sm text-gray-600">Aqui é mostrado os dados da empresa</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <p className="text-gray-700">
            Você selecionou a empresa <span className="font-medium">"{empresa.nome}"</span> para editar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium text-teal-600">
              Nome
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="nome"
                value={empresa.nome}
                onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
                className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          {/* Código Interno / CNPJ */}
          <div className="space-y-2">
            <Label htmlFor="codigo" className="text-sm font-medium text-teal-600">
              Código Interno / CNPJ
            </Label>
            <Input
              id="codigo"
              value={empresa.codigoInterno}
              onChange={(e) => setEmpresa({ ...empresa, codigoInterno: e.target.value })}
              className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              placeholder="Código ou CNPJ"
            />
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <Label htmlFor="tipo" className="text-sm font-medium text-teal-600">
              Tipo
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <Select value={empresa.tipo} onValueChange={(value) => setEmpresa({ ...empresa, tipo: value })}>
                <SelectTrigger className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Auditor">Auditor</SelectItem>
                  <SelectItem value="Operador">Operador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-8">
          <Button variant="outline" size="icon" className="h-10 w-10 border-gray-300">
            <Lock className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="rounded-xl">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Salvando...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>SALVAR</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
