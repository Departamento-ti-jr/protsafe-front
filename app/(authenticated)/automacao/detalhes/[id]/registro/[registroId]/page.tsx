"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, Download, Upload, FileText, Calendar, 
  Hash, ShieldCheck, DollarSign, FileCheck, Paperclip, 
  ChevronRight, Loader2, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ComposicaoDadosAnsService, type ComposicaoDadosRegistroDetalhe } from "@/lib/services/composicao-dados-ans.service"

export default function RegistroDetalhePage({ params }: { params: Promise<{ id: string; registroId: string }> }) {
  const { id: abiId, registroId } = React.use(params)

  const [registro, setRegistro] = useState<ComposicaoDadosRegistroDetalhe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [removeError, setRemoveError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await ComposicaoDadosAnsService.getRegistroById(registroId)
        setRegistro(response)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Não foi possível carregar os detalhes do registro.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [registroId])

  const handleUpload = async () => {
    if (!file) return
    try {
      setUploading(true)
      setUploadError(null)
      await ComposicaoDadosAnsService.uploadAnexo(registroId, file)
      const refreshed = await ComposicaoDadosAnsService.getRegistroById(registroId)
      setRegistro(refreshed)
      setFile(null)
    } catch (err) {
      console.error(err)
      setUploadError("Erro ao anexar arquivo.")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async (anexoId: string) => {
    try {
      setRemovingId(anexoId)
      setRemoveError(null)
      await ComposicaoDadosAnsService.removeAnexo(registroId, anexoId)
      const refreshed = await ComposicaoDadosAnsService.getRegistroById(registroId)
      setRegistro(refreshed)
    } catch (err) {
      console.error(err)
      setRemoveError("Erro ao remover anexo.")
    } finally {
      setRemovingId(null)
    }
  }

  if (loading) return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
    </div>
  )

  if (error || !registro) return (
    <div className="p-6 text-center">
      <p className="text-destructive font-medium">{error || "Registro não encontrado."}</p>
      <Button variant="link" onClick={() => window.location.reload()}>Tentar novamente</Button>
    </div>
  )

  const docPrincipal = registro.s3PathDocPrincipal
  const anexosAdicionais = Array.isArray(registro.s3PathDocAdicional) ? registro.s3PathDocAdicional : []

  return (
    <div className="mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Header com Navegação Hierárquica */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/automacao/detalhes/${abiId}`}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>ABI {registro.numeroAbi}</span>
              <ChevronRight className="h-3 w-3" />
              <span>Registro ANS {registro.registroAns}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Registro <span className="text-primary">#{registro.ordem}</span>
            </h1>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 border-blue-100">
          Status: Em Análise
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Principal: Dados da Defesa */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-lg">Informações da Defesa</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InfoItem icon={<FileText />} label="Pedido" value={registro.pedidoDefesa} />
              <InfoItem icon={<Hash />} label="AIH / APAC" value={registro.numeroAihApac} mono />
              <div className="md:col-span-2">
                <Separator className="my-2" />
              </div>
              <InfoItem label="Tipo de Defesa" value={registro.tipoDefesa} />
              <InfoItem label="Qtd. Documentos" value={registro.qtdDocumentos?.toString()} />
              <div className="md:col-span-2 space-y-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Alegações e Cláusulas</p>
                  <div className="space-y-3">
                    <InfoItem label="1ª Alegação" value={registro.descricaoPrimeiraAlegacao || registro.codigoPrimeiraAlegacao} />
                    <InfoItem label="2ª Alegação" value={registro.descricaoSegundaAlegacao || registro.codigoSegundaAlegacao} />
                    <InfoItem 
                      label="Cláusulas Aplicadas" 
                      value={registro.clausulaSegundaAlegacao ? `${registro.clausulaPrimeiraAlegacao} • ${registro.clausulaSegundaAlegacao}` : registro.clausulaPrimeiraAlegacao} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Documentos - Estilo Lista de Arquivos */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Paperclip className="h-5 w-5 text-slate-500" /> Documentação
                  </CardTitle>
                  <CardDescription>Gestão de anexos e arquivos S3</CardDescription>
                </div>
                <Badge variant="outline" className="font-normal">{anexosAdicionais.length + (docPrincipal ? 1 : 0)} arquivos</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Arquivo Principal */}
              <div className="group relative flex items-center justify-between p-4 rounded-xl border border-blue-100 bg-blue-50/30 transition-all hover:bg-blue-50">
                <div className="flex items-center gap-4 truncate">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold text-xs">PDF</div>
                  <div className="truncate">
                    <p className="text-sm font-semibold text-slate-900">Documento Principal</p>
                    <p className="text-xs text-slate-500 truncate max-w-[300px]">{docPrincipal || "Nenhum arquivo disponível"}</p>
                  </div>
                </div>
                {docPrincipal && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={docPrincipal} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>

              {/* Lista Adicionais */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase ml-1">Anexos Adicionais</p>
                {anexosAdicionais.length > 0 ? (
                  anexosAdicionais.map((anexo: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileCheck className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600 truncate max-w-[200px] md:max-w-md">{anexo.url}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={anexo.url} target="_blank" rel="noopener noreferrer"><Download className="h-4 w-4" /></a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(anexo.id)}
                          disabled={removingId === anexo.id}
                          title="Remover anexo"
                        >
                          {removingId === anexo.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-red-500" />}
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 border-2 border-dashed rounded-lg border-slate-100 text-slate-400 text-sm">
                    Nenhum anexo extra encontrado.
                  </div>
                )}
                {removeError && <p className="text-xs text-red-600">{removeError}</p>}
              </div>

              {/* Upload Zone */}
              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row gap-3 items-end">
                  <div className="w-full space-y-1.5">
                    <label className="text-xs font-medium text-slate-600">Novo Anexo (PDF)</label>
                    <Input 
                      type="file" 
                      accept=".pdf" 
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)} 
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                  <Button 
                    onClick={handleUpload} 
                    disabled={!file || uploading}
                    className="w-full sm:w-auto px-8"
                  >
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                    Anexar
                  </Button>
                </div>
                {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Lateral: Datas e Valores */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm border-t-4 border-t-teal-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" /> Prazos e Vigência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem label="Data Inicial" value={registro.dataInicial} />
              <InfoItem label="Data Final" value={registro.dataFinal} />
              <Separator />
              <InfoItem label="Inclusão Beneficiário" value={registro.dataInclusaoBeneficiario} />
              <InfoItem label="Fim Carência" value={registro.dataFimCarencia} />
              <InfoItem label="Fim CPT" value={registro.dataFimCpt} />
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-600" /> Valores e Cálculos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Copart." value={registro.copart} />
                <InfoItem label="Total Copart." value={registro.totalCopart} />
              </div>
              <InfoItem label="Valor Abatido" value={registro.valorAbatido} isHighlight />
              <Separator />
              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                <p className="text-xs font-medium text-amber-800 mb-1">Memória de Cálculo</p>
                <p className="text-sm text-amber-900 leading-relaxed font-mono">{registro.memoriaDeCalculo || "Nenhum detalhe disponível"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Hash de Segurança Footer */}
          <div className="px-4 py-3 bg-slate-100 rounded-lg flex items-center gap-2 overflow-hidden">
            <Hash className="h-3 w-3 text-slate-400 shrink-0" />
            <span className="text-[10px] font-mono text-slate-500 truncate uppercase tracking-tighter">
              {registro.hash || "sem-hash-disponivel"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Componentes Internos Utilitários
 */
function InfoItem({ 
  label, 
  value, 
  icon, 
  mono = false, 
  isHighlight = false 
}: { 
  label: string; 
  value?: string | null; 
  icon?: React.ReactNode;
  mono?: boolean;
  isHighlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-slate-400">{React.cloneElement(icon as React.ReactElement, { size: 12 })}</span>}
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      </div>
      <p className={`
        ${mono ? "font-mono" : "font-medium"} 
        ${isHighlight ? "text-lg text-primary font-bold" : "text-sm text-slate-700"}
        truncate
      `}>
        {value || <span className="text-slate-300 italic font-normal text-xs underline decoration-dotted">Não informado</span>}
      </p>
    </div>
  )
}
