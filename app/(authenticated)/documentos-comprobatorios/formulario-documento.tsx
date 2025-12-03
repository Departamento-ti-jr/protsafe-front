'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DocumentosComprobatoriosService,
  type DocumentoComprobatorio,
} from '@/lib/services/documentos-comprobatorios.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  id?: string
}

export function FormularioDocumento({ id }: Props) {
  const router = useRouter()
  const [documento, setDocumento] = useState<DocumentoComprobatorio | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingHandleSave, setLoadingHandleSave] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tipo, setTipo] = useState('')
  const isNew = !id

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const fetchDocumento = async () => {
      try {
        const result = await DocumentosComprobatoriosService.getById(id)
        setDocumento(result)
        setTipo(result.tipo)
      } catch (err) {
        setError('Erro ao carregar os detalhes do documento.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDocumento()
  }, [id])

  const handleSalvar = async () => {
    try {
      setLoadingHandleSave(true)
      if (isNew) {
        const response = await DocumentosComprobatoriosService.create({ tipo })
        router.push(`/documentos-comprobatorios/editar/${response.id}`)
      } else {
        await DocumentosComprobatoriosService.update(id, { tipo })
      }
    } catch (err) {
      console.error('Erro ao salvar documento:', err)
      setError('Erro ao salvar documento.')
    } finally {
      setLoadingHandleSave(false);
    }
  }

  if (loading) return <div className="p-6">Carregando...</div>
  if (error || (!documento && !isNew)) return <div className="p-6 text-red-600">{error || 'Documento não encontrado.'}</div>

  return (
    <div className="p-6 space-y-6 bg-[#f9f9f9] min-h-screen">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <Link href="/documentos-comprobatorios">
          <Button variant="ghost" size="icon" className="rounded-full border border-gray-300">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#2e2e2e]">
            {isNew ? 'Novo Documento Comprobatório' : `Editar Documento`}
          </h1>
          <p className="text-sm text-gray-600">
            {isNew
              ? 'Preencha os campos para cadastrar um novo documento comprobatório'
              : 'Altere os dados desejados e clique em salvar'}
          </p>
        </div>
      </div>

      {/* Card de formulário */}
      <Card className="bg-white shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#2e2e2e]">
            {isNew ? 'Cadastro de Documento Comprobatório' : 'Dados do Documento'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tipo" className="text-sm font-medium text-[#3b3b3b]">
              Nome do Documento
            </Label>
            <Input
              id="tipo"
              placeholder="Digite o nome do documento comprobatório"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              disabled={loading}
              className="bg-[#fdfdfd] border border-[#c7c7c7] text-gray-800"
            />
          </div>

          {!isNew && documento && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Criação</p>
                <p className="text-sm text-gray-700">
                  {new Date(documento.criadoEm).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Última Atualização</p>
                <p className="text-sm text-gray-700">
                  {new Date(documento.atualizadoEm).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSalvar}
              disabled={loadingHandleSave || !tipo}
              className="text-xs"
            >
              <Save className="h-4 w-4 mr-2" />
              { loadingHandleSave && 'Salvando...' || (isNew ? 'Cadastrar Documento' : 'Salvar Alterações')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
