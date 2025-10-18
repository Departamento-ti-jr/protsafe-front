"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Upload, Save, Cloud, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

interface DefesaAcoesProps {
  disableButtonSendAns?: boolean
  anexedDocuments: any[]
  isLoading: boolean
  loadSalvarDefesa: "salvando" | "gerando-pdf" | null
  onAnexarDocumento: () => void
  onEnviarParaAns: () => void
  onSalvarOuAtualizar: () => void
  salvarLabel?: string // exemplo: "SALVAR E GERAR DEFESA" ou "ATUALIZAR DEFESA"
}

export function DefesaAcoes({
  disableButtonSendAns,
  anexedDocuments,
  isLoading,
  loadSalvarDefesa,
  onAnexarDocumento,
  onEnviarParaAns,
  onSalvarOuAtualizar,
  salvarLabel = "SALVAR E GERAR DEFESA",
}: DefesaAcoesProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = React.useState(false)

  return (
    <>
      <div className="flex justify-end gap-4">
        {/* Botão de anexar */}
        <Button
          disabled={isLoading}
          variant="outline"
          className="rounded-xl bg-transparent"
          onClick={onAnexarDocumento}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isLoading ? "Enviando..." : "ANEXAR DOCUMENTO"}
        </Button>

        {/* Botão de integrar com ANS */}
        {!disableButtonSendAns && (
          <Button
            variant="outline"
            className="rounded-xl bg-transparent"
            onClick={() => {
              if (!anexedDocuments || anexedDocuments.length === 0) {
                setIsConfirmDialogOpen(true)
              } else {
                onEnviarParaAns()
              }
            }}
          >
            <Cloud className="mr-2 h-4 w-4" /> INTEGRAR ANS
          </Button>
        )}

        {/* Botão de salvar/gerar defesa */}
        <Button
          disabled={!!loadSalvarDefesa}
          onClick={onSalvarOuAtualizar}
          className={cn(
            "rounded-xl min-w-[200px]",
            loadSalvarDefesa === "salvando" && "bg-yellow-500 hover:bg-yellow-600",
            loadSalvarDefesa === "gerando-pdf" && "bg-blue-600 hover:bg-blue-700"
          )}
        >
          {loadSalvarDefesa ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadSalvarDefesa === "salvando" ? "Salvando..." : "Gerando PDF..."}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {salvarLabel}
            </>
          )}
        </Button>
      </div>

      {/* 🔸 Diálogo de confirmação (quando não há documentos anexados) */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Atenção</AlertDialogTitle>
          <AlertDialogDescription>
            Não existem documentos anexados. Deseja enviar mesmo assim?
          </AlertDialogDescription>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setIsConfirmDialogOpen(false)
                onEnviarParaAns()
              }}
            >
              Enviar mesmo assim
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
