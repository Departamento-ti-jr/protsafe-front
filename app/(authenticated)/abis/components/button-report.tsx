'use client'

import { useState } from "react"
import { FileSpreadsheet, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { AbisService } from "@/lib/services/abis.service"

/**
 * Botão da coluna "Ações" da tabela de ABIs.
 *
 * Cada linha da tabela já é um ABI de uma operadora (abi.id é a
 * chave do registro, não o número do ABI), então basta o id.
 */
export function BotaoRelatorioDocumentos({ abiId }: { abiId: string | number }) {
  const [gerando, setGerando] = useState(false)

  async function handleGerar() {
    setGerando(true)

    try {
      const { url, totalBeneficiarios, semDocumento } =
        await AbisService.reportAbi(String(abiId))

      baixarArquivo(url)

      toast.success("Relatório gerado", {
        description: `${totalBeneficiarios} beneficiários — ${semDocumento} sem nenhum documento.`,
      })
    } catch (error) {
      toast.error("Não foi possível gerar o relatório", {
        description: extrairMensagem(error),
      })
    } finally {
      setGerando(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleGerar}
      disabled={gerando}
      title="Planilha com os documentos de cada beneficiário"
      className="h-8 px-3 text-slate-400 hover:text-primary hover:bg-primary/10 flex items-center gap-2"
    >
      <span className="text-xs font-semibold">
        {gerando ? "Gerando..." : "Relatório"}
      </span>
      {gerando ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <FileSpreadsheet className="h-4 w-4" aria-hidden />
      )}
    </Button>
  )
}

/**
 * A presigned URL expira em 5 minutos, então o download dispara na
 * hora. Um link temporário evita o bloqueio de popup que o
 * window.open sofre em alguns navegadores.
 */
function baixarArquivo(url: string) {
  const link = document.createElement("a")
  link.href = url
  link.download = ""
  link.rel = "noopener"
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function extrairMensagem(error: unknown): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response
    if (response?.data?.message) return response.data.message
  }

  if (error instanceof Error && error.message) return error.message

  return "Tente novamente em instantes."
}