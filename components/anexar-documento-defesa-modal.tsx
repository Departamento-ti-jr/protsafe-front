"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnsTiposDocumentosService, type AnsTipoDocumento } from "@/lib/services/ans-tipos-documentos.service"

interface SelectedFile {
  file: File
  id: string
}

interface AnexarDocumentoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (files: SelectedFile[], documentType: number) => void // documentType = id_ans do tipo_documento
}

export function AnexarDocumentoDefesaModal({ open, onOpenChange, onSubmit }: AnexarDocumentoModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("")
  const [isDragOver, setIsDragOver] = useState(false)

  // estado p/ tipos vindos da API
  const [docTypes, setDocTypes] = useState<AnsTipoDocumento[]>([])
  const [loadingTypes, setLoadingTypes] = useState(false)
  const [typesError, setTypesError] = useState<string | null>(null)

  // carrega tipos quando o modal abre
  useEffect(() => {
    let cancelled = false
    const loadTypes = async () => {
      setLoadingTypes(true)
      setTypesError(null)
      try {
        const data = await AnsTiposDocumentosService.getAll()
        console.log("Tipos de documento ANS carregados:", data)
        if (!cancelled) setDocTypes(data)
      } catch (e: any) {
        if (!cancelled) setTypesError("Erro ao carregar tipos de documento")
        console.error(e)
      } finally {
        if (!cancelled) setLoadingTypes(false)
      }
    }
    if (open) loadTypes()
    return () => {
      cancelled = true
    }
  }, [open])

  useEffect(() => {
    console.log("Selected document type changed:", selectedDocumentType)
  }, [selectedDocumentType])

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
      const numericDocumentType = Number(selectedDocumentType)
      console.log("Submitting files with document type ID (ANS):", numericDocumentType)
      if (Number.isNaN(numericDocumentType)) return

      onSubmit(selectedFiles, numericDocumentType) // envia o id_ans do tipo selecionado
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
              <Select
                value={selectedDocumentType}
                onValueChange={setSelectedDocumentType}
                disabled={loadingTypes || !!typesError}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loadingTypes
                        ? "Carregando tipos..."
                        : typesError
                        ? "Erro ao carregar tipos"
                        : "Selecione o tipo do documento..."
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {docTypes.length === 0 && !loadingTypes && !typesError && (
                    <div className="px-3 py-2 text-sm text-gray-500">Nenhum tipo encontrado</div>
                  )}
                  {docTypes.map((type) => (
                    // value = id_ans numérico — o backend espera isso no upload
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {typesError && <p className="text-xs text-red-600">{typesError}</p>}
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
