"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UploadCloud } from "lucide-react"
import Link from "next/link"
import { useDropzone } from "react-dropzone"
import { Badge } from "@/components/ui/badge"
import { AbisService } from "@/lib/services/abis.service"

export default function NovaABIPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/csv": [".csv"], "application/vnd.ms-excel": [".csv"] },
    multiple: false,
    onDrop: (accepted) => {
      setFiles(accepted)
      setSuccess(null)
      setError(null)
    }
  })

  const handleSubmit = async () => {
    if (files.length === 0) {
      setError("Selecione um arquivo .csv para enviar.")
      return
    }
    try {
      setUploading(true)
      setError(null)
      setSuccess(null)

      const tipoDoc = "AMAZONAS_FINAL_PROTSAFE" // ajuste se quiser tornar editável
      const upsert = true
      const batchSize = 1000

      const res = await AbisService.uploadCsv(files[0], { tipoDoc, upsert, batchSize })
      setSuccess(`Importado: total=${res.total}, inseridos=${res.inserted}, upserts=${res.upserted}, matched=${res.matched}`)
      setFiles([])
      setTimeout(() => router.push("/abis"), 1200)
    } catch (e: any) {
      setError(e?.message || "Erro ao enviar CSV da ABI.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/abis">
          <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Nova ABI</h1>
      </div>

      <p className="text-sm text-muted-foreground">Importe o arquivo <b>.csv</b> da ABI.</p>

      <Card>
        <CardHeader><CardTitle>Upload de ABI (CSV)</CardTitle></CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-input bg-card"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-8 h-8 text-primary mb-2" />
            <p className="text-muted-foreground"><span className="font-semibold text-foreground">Adicione</span> ou arraste o .csv aqui.</p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-1">
              <p className="text-sm font-medium">Arquivo selecionado:</p>
              <Badge variant="secondary">{files[0].name}</Badge>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          {success && <p className="mt-4 text-sm text-green-600">{success}</p>}

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit} disabled={uploading || files.length === 0}>
              {uploading ? "Enviando..." : "Cadastrar ABI"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
