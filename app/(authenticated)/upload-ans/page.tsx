"use client"

import { useState } from "react"
import Link from "next/link"
import { useDropzone } from "react-dropzone"
import { ArrowLeft, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AnsImportCsvResponse, AnsImportService } from "@/lib/services/ans-import.service"

export default function UploadAnsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [importResult, setImportResult] = useState<AnsImportCsvResponse | null>(null)
  const [showResultModal, setShowResultModal] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/csv": [".csv"], "application/vnd.ms-excel": [".csv"] },
    multiple: false,
    onDrop: (accepted) => {
      setFile(accepted[0] || null)
      setError(null)
      setSuccess(null)
      setImportResult(null)
      setShowResultModal(false)
    },
  })

  const handleUpload = async () => {
    if (!file) {
      setError("Selecione um arquivo .csv para enviar.")
      return
    }

    try {
      setUploading(true)
      setError(null)
      setSuccess(null)

      const res = (await AnsImportService.uploadCsv(file)) as AnsImportCsvResponse
      setImportResult(res)

      const message =
        res?.message ||
        `Importação concluída. Inseridos: ${res?.inseridos ?? 0}, Ignorados: ${res?.ignorados ?? 0}.`

      const hasErrors = Boolean(res?.erros && res.erros.length > 0)

      if (hasErrors) {
        setShowResultModal(true)
      }

      setSuccess(message)
      if (!hasErrors) {
        setFile(null)
      }
    } catch (e: any) {
      const message =
        e?.body?.message || e?.message || "Erro ao enviar arquivo CSV."
      setError(message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Upload ANS (CSV)</h1>
      </div>

      <p className="text-sm text-muted-foreground">
        Arraste ou selecione um arquivo <b>.csv</b> para enviá-lo para a rota{" "}
        <code className="ml-1 px-1 py-0.5 rounded bg-muted text-xs">/ans/import-csv</code>.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Importação de CSV</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-input bg-card"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-8 h-8 text-primary mb-2" />
            <p className="text-muted-foreground text-center">
              <span className="font-semibold text-foreground">Solte ou clique</span>{" "}
              para escolher o arquivo CSV (somente .csv).
            </p>
          </div>

          {file && (
            <div className="mt-2 space-y-1">
              <p className="text-sm font-medium">Arquivo selecionado:</p>
              <Badge variant="secondary">{file.name}</Badge>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="flex justify-end pt-2">
            <Button onClick={handleUpload} disabled={uploading || !file}>
              {uploading ? "Enviando..." : "Enviar CSV"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Importação finalizada com avisos</DialogTitle>
            <DialogDescription>
              O arquivo foi processado, mas ocorreram erros nas linhas abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Resumo:</span>{" "}
              Inseridos: {importResult?.inseridos ?? 0} | Ignorados: {importResult?.ignorados ?? 0} |
              Duplicados (banco): {importResult?.duplicadosBanco?.length ?? 0} | Duplicados (CSV):{" "}
              {importResult?.duplicadosCsv?.length ?? 0}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Motivos:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {importResult?.erros?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowResultModal(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
