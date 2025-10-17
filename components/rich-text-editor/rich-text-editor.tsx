"use client"

import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import MenuBar from "./menu-bar"
import "./custom-css.css"

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // 🔁 Atualiza o conteúdo quando value mudar
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false)
    }
  }, [value, editor])

  
  useEffect(() => {
    if (!editor) return

    const handleTab = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault()
        editor.commands.insertContent("\u00A0\u00A0\u00A0\u00A0") // 4 espaços
      }
    }

    const editorEl = document.querySelector("#rich-text-editor .ProseMirror")
    editorEl?.addEventListener("keydown", handleTab)

    return () => editorEl?.removeEventListener("keydown", handleTab)
  }, [editor])

  return (
    <div id="rich-text-editor" className="w-full">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="border rounded-md p-2 bg-white min-h-[150px]"
      />
    </div>
  )
}
