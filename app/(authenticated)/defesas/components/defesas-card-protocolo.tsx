"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag, Lock, Save, Pencil } from "lucide-react"
import { Defesa } from "@/lib/services/defesas.service"
import { httpClient } from "@/lib/http-client"
import { useToast } from "@/components/ui/use-toast"

interface DefesasAtendimentoProps {
  defesa?: Defesa
}

export default function DefesaCardProtocolo({ defesa }: DefesasAtendimentoProps) {
  const [numProtocolo, setNumProtocolo] = useState(defesa?.numProtocoloAns || "")
  const [editable, setEditable] = useState(!defesa?.numProtocoloAns)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  /** Alterna entre bloquear e liberar o campo */
  const handleToggleEdit = () => setEditable(prev => !prev)

  /** Salva protocolo via PATCH */
  const saveOrUpdateProtocolo = async () => {
    if (!defesa?._id) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível identificar o registro da defesa.",
      })
      return
    }

    if (!numProtocolo.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "O número do protocolo ANS não pode estar vazio.",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await httpClient.patch<{ message: string; data: any }>(
        `/defesa/${defesa._id}`,
        { numProtocoloAns: numProtocolo }
      )

      const updated = (response as any)?.data?.numProtocoloAns || numProtocolo
      setNumProtocolo(updated)

      toast({
        title: "Protocolo atualizado!",
        description: "O número do protocolo ANS foi salvo com sucesso.",
      })

      setEditable(false)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description:
          error?.body?.message || "Não foi possível salvar o protocolo. Tente novamente.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /** Permite salvar com Enter */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editable && !isSaving && numProtocolo.trim()) {
      e.preventDefault()
      saveOrUpdateProtocolo()
    }
  }

  return (
    <Card className="p-5 border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-[rgba(43,62,89,0.3)] backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div className="flex flex-col p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50 bg-slate-50/40 dark:bg-slate-800/30 hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors duration-200">

          {/* 🔹 Título + botão separados */}
          <div className="flex items-center justify-between mb-1">
            <Label className="text-[12px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" />
              Protocolo ANS
            </Label>

            {defesa && (
              <button
                type="button"
                onClick={handleToggleEdit}
                disabled={isSaving}
                className={`text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors ${
                  isSaving ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title={editable ? "Bloquear edição" : "Editar protocolo"}
              >
                {editable ? <Lock size={14} /> : <Pencil size={14} />}
              </button>
            )}
          </div>

          <Input
            value={numProtocolo}
            onChange={(e) => setNumProtocolo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite o protocolo ANS"
            disabled={!editable || isSaving}
            className={`text-[13px] font-semibold ${
              editable
                ? "bg-white dark:bg-slate-900"
                : "bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
            }`}
          />

          {editable && (
            <div className="mt-2">
              <Button
                onClick={saveOrUpdateProtocolo}
                disabled={isSaving || !numProtocolo.trim()}
                variant="default"
                size="sm"
                className="h-7 text-[12px] px-3 flex items-center justify-start gap-1"
              >
                <Save size={13} className={isSaving ? "animate-spin" : ""} />
                {isSaving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
