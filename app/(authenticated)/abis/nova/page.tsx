"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, UploadCloud } from "lucide-react"
import Link from "next/link"
import { Abi, AbisService } from "@/lib/services/abis.service"
import { useDropzone } from "react-dropzone"
import { Badge } from "@/components/ui/badge"

export default function NovaABIPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/json": [".json"],
      "application/xml": [".xml"],
      "text/plain": [".txt"]
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles)
      setSuccess(false)
      setError(null)
    }
  })

  const handleSubmit = async () => {
    if (files.length === 0) {
      setError("Selecione um arquivo para enviar.")
      return
    }

    try {
      setUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append("file", files[0])

      const response = await fetch("/api/abis/upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar ABI.")
      }

      setSuccess(true)
      setFiles([])
      setTimeout(() => {
        router.push("/abis")
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Erro ao cadastrar ABI.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/abis">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Nova ABI</h1>
      </div>

      <p className="text-sm text-muted-foreground">Importe arquivos da ABI para cadastrar</p>

      <Card>
        <CardHeader>
          <CardTitle>Upload de ABI</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-400 bg-blue-50" : "border-cyan-400 bg-white"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-8 h-8 text-cyan-600 mb-2" />
            <p className="text-gray-600">
              <span className="font-semibold text-cyan-700">Adicione</span> ou arraste os arquivos aqui!
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-1">
              <p className="text-sm font-medium">Arquivo selecionado:</p>
              <Badge variant="secondary">{files[0].name}</Badge>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-4 text-sm text-green-600">Upload realizado com sucesso!</p>}

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
