"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface DocumentType {
  nome: string
  id: number
}

interface SelectedFile {
  file: File
  id: string
}

interface AnexarDocumentoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (files: SelectedFile[], documentType: string) => void
}

const documentTypes: DocumentType[] = [
  { nome: "Anexo", id: 61 },
  { nome: "Documento Comprobatório", id: 21 },
  { nome: "Sumário Financeiro", id: 41 },
  { nome: "Ofício", id: 1 },
  { nome: "Petição", id: 2 },
  { nome: "Aviso de Recebimento", id: 3 },
  { nome: "Certidão", id: 4 },
  { nome: "Contrato", id: 5 },
  { nome: "Declaração", id: 6 },
  { nome: "Declaração de Saúde", id: 7 },
  { nome: "Edital", id: 8 },
  { nome: "Edital de Notificação", id: 9 },
  { nome: "Formulário", id: 10 },
  { nome: "Laudo de Auditoria", id: 11 },
  { nome: "Proposta de Adesão", id: 12 },
  { nome: "Termo de Adesão", id: 13 },
  { nome: "CAT", id: 14 },
  { nome: "Comprovante de Protocolo", id: 15 },
  { nome: "Outros", id: 16 },
  { nome: "GRU", id: 17 },
  { nome: "Detalhamento", id: 18 },
  { nome: "Nota Técnica", id: 19 },
  { nome: "Decisão", id: 20 },
  { nome: "Parecer de Auditoria", id: 81 },
  { nome: "Relatório da Auditoria", id: 101 },
  { nome: "Relatório com os resultados da Pesquisa", id: 82 },
  { nome: "Termo de Responsabilidade", id: 83 },
  { nome: "RN 388 - OFÍCIO INTIMAÇÃO DECISÃO", id: 122 },
  { nome: "Despacho Geral", id: 142 },
  { nome: "RN 388 - OFICIO NOTIFICACAO PAGAMENTO ANTECIPADO 40", id: 162 },
  { nome: "Ofício Comunicando Arquivamento", id: 163 },
  { nome: "RN 388 - DESPACHO MANUTENCAO __DIFIS", id: 183 },
  { nome: "Relatório de Auto de Infração", id: 164 },
  { nome: "RN 388 - OFICIO NOTIFICACAO PAGAMENTO ANTECIPADO 40__NÚCLEOS", id: 184 },
  { nome: "Notificação", id: 242 },
  { nome: "Ofício - Quando o Ofício Anterior não Foi Atendido Completamente", id: 682 },
  { nome: "Representação", id: 1422 },
  { nome: "Ofício de Intimação de Decisão - Outros", id: 1702 },
  { nome: "RN 483 - OFICIO NOTIFICACAO PAGAMENTO ANTECIPADO 40__NÚCLEOS", id: 1822 },
  { nome: "RN 483 - RELATÓRIO DE ANÁLISE CONCLUSIVA - MANUTENÇÃO DA AUTUAÇÃO", id: 2222 },
  { nome: "RN 388 - DECISÃO DE HOMOLOGAÇÃO DE PEDIDO DE PAGAMENTO ANTECIPADO COM DESCONTO (40%)", id: 2342 },
  { nome: "RN 388 - DECISÃO PENALIZANDO", id: 102 },
  { nome: "Relatório de Diligência por E-mail", id: 484 },
  { nome: "RN 388 - OFÍCIO INTIMAÇÃO DE DEFESA DE A.I.", id: 182 },
  { nome: "Relatório de Arquivamento", id: 203 },
  { nome: "RN 388 - DECISÃO - ANULAÇÃO A.I. E ARQUIVAMENTO", id: 165 },
  { nome: "Relatório de Abertura de Processo", id: 185 },
  { nome: "Carta ao Cidadão Solicitando Documentos", id: 222 },
  { nome: "RN 388 - OFICIO NOVA DECISAO_NUCLEOS", id: 342 },
  { nome: "Ofício à Operadora Comunicando Decisão", id: 362 },
  { nome: "CD - NÃO RESOLVIDA", id: 382 },
  { nome: "Auto de representação", id: 482 },
  { nome: "RN 388 - DECISÃO HOMOLOGAÇÃO REPARACAO POSTERIOR 80", id: 722 },
  { nome: "RN 388 - OFÍCIO DE INTIMAÇÃO DE DEFESA AI - NÚCLEOS", id: 762 },
  { nome: "Diligência no Âmbito de Outros Processos", id: 1002 },
  { nome: "Intervenção Fiscalizatória - Despacho de Aprovação da Nota Técnica de Análise Preliminar", id: 1402 },
  { nome: "Extrato para Publicação no Diário Oficial", id: 1582 },
  { nome: "Informação", id: 1642 },
  { nome: "OFICIO DE CIENCIA DE GRAVAME", id: 1643 },
  { nome: "RN 483 - OFÍCIO INTIMAÇÃO DE DEFESA DE A.I. DIFIS", id: 1882 },
]

export function AnexarDocumentoDefesaModal({ open, onOpenChange, onSubmit }: AnexarDocumentoModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("")
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return

    const newFiles: SelectedFile[] = Array.from(files).map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }))

    setSelectedFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (fileId: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = () => {
    if (selectedFiles.length > 0 && selectedDocumentType) {
      onSubmit(selectedFiles, selectedDocumentType)
      // Reset form
      setSelectedFiles([])
      setSelectedDocumentType("")
      onOpenChange(false)
    }
  }

  const handleClose = () => {
    setSelectedFiles([])
    setSelectedDocumentType("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Anexar Documento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400",
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Adicione ou arraste os arquivos aqui!</p>
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Selecionar Arquivos
            </label>
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              {selectedFiles.map((selectedFile) => (
                <div key={selectedFile.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedFile.file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(selectedFile.file.size)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(selectedFile.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Document Type Selector */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Selecione o Tipo do Documento</label>
              <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo do documento..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {documentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit Button */}
          {selectedFiles.length > 0 && (
            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={!selectedDocumentType} className="bg-teal-600 hover:bg-teal-700">
                ENVIAR DOCUMENTO
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
