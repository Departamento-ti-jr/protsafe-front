"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Upload, Save, Cloud } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"

interface DefesaAcoesProps {
  anexedDocuments: any[]
  isLoading: boolean
  loadSalvarDefesa: boolean
  onAnexarDocumento: () => void
  onEnviarParaAns: () => void
  onSalvarOuAtualizar: () => void
  salvarLabel?: string // exemplo: "SALVAR E GERAR DEFESA" ou "ATUALIZAR DEFESA"
}

export function DefesaAcoes({
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
        <Button
          disabled={isLoading}
          variant="outline"
          className="rounded-xl bg-transparent"
          onClick={onAnexarDocumento}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isLoading ? "Enviando..." : "ANEXAR DOCUMENTO"}
        </Button>

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

        <Button
          className="rounded-xl"
          onClick={onSalvarOuAtualizar}
          disabled={loadSalvarDefesa}
        >
          <Save className="mr-2 h-4 w-4" />
          {loadSalvarDefesa ? "SALVANDO..." : salvarLabel}
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
