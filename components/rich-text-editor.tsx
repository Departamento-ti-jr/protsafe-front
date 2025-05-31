"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

interface RichTextEditorProps {
  initialValue: string
  onChange: (value: string) => void
}

export function RichTextEditor({ initialValue, onChange }: RichTextEditorProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    onChange(newValue)
  }

  // Em uma implementação real, aqui teríamos a lógica para formatar o texto
  // com negrito, itálico, etc. usando uma biblioteca como TinyMCE, CKEditor ou Quill
  const applyFormat = (format: string) => {
    console.log(`Aplicando formato: ${format}`)
    // Implementação simplificada para demonstração
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <Button variant="ghost" size="icon" onClick={() => applyFormat("bold")} className="h-8 w-8">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("italic")} className="h-8 w-8">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("underline")} className="h-8 w-8">
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-8 bg-gray-300 mx-1"></div>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("list")} className="h-8 w-8">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("ordered-list")} className="h-8 w-8">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-8 bg-gray-300 mx-1"></div>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("align-left")} className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("align-center")} className="h-8 w-8">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => applyFormat("align-right")} className="h-8 w-8">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
      <textarea value={value} onChange={handleChange} className="w-full p-3 min-h-[200px] focus:outline-none" />
    </div>
  )
}
