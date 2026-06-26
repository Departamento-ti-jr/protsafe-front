"use client"

import { useState } from "react"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteButtonProps {
  /** Quantidade de itens a excluir. 1 = exclusão singular, >1 = exclusão em lote */
  count?: number
  /** Callback chamado após confirmação */
  onConfirm: () => void
  /** Desabilita o botão */
  disabled?: boolean
  /** Estado de loading externo (enquanto a exclusão está em andamento) */
  loading?: boolean
  /** Variante visual: "icon" para o botão da linha da tabela, "button" para o botão do header */
  variant?: "icon" | "button"
}

export function DeleteButton({
  count = 1,
  onConfirm,
  disabled = false,
  loading = false,
  variant = "button",
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false)

  const isBulk = count > 1

  const title = isBulk
    ? `Excluir ${count} documentos`
    : "Excluir documento"

  const description = isBulk
    ? `Tem certeza que deseja excluir os ${count} documentos selecionados? Essa ação não pode ser desfeita.`
    : "Tem certeza que deseja excluir este documento? Essa ação não pode ser desfeita."

  const handleConfirm = () => {
    setOpen(false)
    onConfirm()
  }

  return (
    <>
      {variant === "icon" ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
          disabled={disabled || loading}
          onClick={() => setOpen(true)}
          title="Excluir"
        >
          <Trash className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          disabled={disabled || loading}
          onClick={() => setOpen(true)}
          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
        >
          <Trash className="h-4 w-4 mr-2" />
          {loading ? "Excluindo..." : isBulk ? `Excluir ${count} documentos` : "Excluir documento"}
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
            >
              Confirmar exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}