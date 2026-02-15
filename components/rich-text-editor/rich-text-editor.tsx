"use client"

import { useCallback, useEffect, useRef, type ChangeEvent } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import { mergeAttributes, Node } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import MenuBar from "./menu-bar"
import "./custom-css.css"

const MIN_IMAGE_WIDTH_PX = 120
const IMAGE_ALIGNS = ["left", "center", "right"] as const
const RESIZE_DIRECTIONS = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const
type ImageAlign = (typeof IMAGE_ALIGNS)[number]
type ResizeDirection = (typeof RESIZE_DIRECTIONS)[number]

const isImageFile = (file: File) => file.type.startsWith("image/")
const isImageAlign = (value: string | undefined | null): value is ImageAlign =>
  IMAGE_ALIGNS.includes(value as ImageAlign)
const isResizeDirection = (value: string | undefined | null): value is ResizeDirection =>
  RESIZE_DIRECTIONS.includes(value as ResizeDirection)
const imageAlignmentStyle = (align: ImageAlign) => {
  if (align === "center") {
    return "display:block;margin-left:auto;margin-right:auto;"
  }
  if (align === "right") {
    return "display:block;margin-left:auto;margin-right:0;"
  }
  return "display:block;margin-left:0;margin-right:auto;"
}

const uniqFiles = (files: File[]) => {
  const seen = new Set<string>()
  return files.filter((file) => {
    const key = `${file.name}-${file.size}-${file.type}-${file.lastModified}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const readImageAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const src = typeof reader.result === "string" ? reader.result : ""
      if (!src) {
        reject(new Error("Falha ao carregar imagem."))
        return
      }
      resolve(src)
    }
    reader.onerror = () => reject(reader.error ?? new Error("Falha ao ler arquivo."))
    reader.readAsDataURL(file)
  })

const ImageNode = Node.create({
  name: "image",
  group: "block",
  atom: true,
  draggable: false,
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      align: {
        default: "left",
        parseHTML: (element) => {
          const align = element.getAttribute("data-align") ?? element.getAttribute("align")
          return isImageAlign(align) ? align : "left"
        },
        renderHTML: (attributes) => {
          const align = isImageAlign(attributes.align) ? attributes.align : "left"
          return {
            align,
            "data-align": align,
            style: imageAlignmentStyle(align),
          }
        },
      },
      width: {
        default: null,
        parseHTML: (element) => {
          const width = element.getAttribute("width")
          if (!width) return null

          const parsedWidth = Number.parseInt(width, 10)
          return Number.isFinite(parsedWidth) && parsedWidth > 0 ? parsedWidth : null
        },
        renderHTML: (attributes) => {
          if (!attributes.width) return {}

          const parsedWidth =
            typeof attributes.width === "number"
              ? attributes.width
              : Number.parseInt(String(attributes.width), 10)

          return Number.isFinite(parsedWidth) && parsedWidth > 0
            ? { width: Math.round(parsedWidth) }
            : {}
        },
      },
    }
  },

  parseHTML() {
    return [{ tag: "img[src]" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      let currentNode = node

      const dom = document.createElement("figure")
      dom.className = "tiptap-image-node"
      dom.contentEditable = "false"

      const imageElement = document.createElement("img")
      imageElement.draggable = false

      const resizeHandles = RESIZE_DIRECTIONS.map((direction) => {
        const handle = document.createElement("span")
        handle.className = `tiptap-image-resize-handle tiptap-image-resize-handle--${direction}`
        handle.setAttribute("contenteditable", "false")
        handle.setAttribute("title", "Arraste para redimensionar")
        handle.setAttribute("aria-label", `Redimensionar imagem pela borda ${direction}`)
        handle.dataset.resizeDirection = direction
        return handle
      })

      dom.append(imageElement, ...resizeHandles)

      const getNodePosition = () => {
        if (typeof getPos !== "function") return null

        try {
          const position = getPos()
          return typeof position === "number" ? position : null
        } catch {
          return null
        }
      }

      const syncImageAttributes = () => {
        const attrs = currentNode.attrs as {
          src?: string | null
          alt?: string | null
          title?: string | null
          align?: ImageAlign | string | null
          width?: number | string | null
        }

        if (attrs.src) {
          imageElement.setAttribute("src", attrs.src)
        } else {
          imageElement.removeAttribute("src")
        }

        if (attrs.alt) {
          imageElement.setAttribute("alt", attrs.alt)
        } else {
          imageElement.removeAttribute("alt")
        }

        if (attrs.title) {
          imageElement.setAttribute("title", attrs.title)
        } else {
          imageElement.removeAttribute("title")
        }

        const align = isImageAlign(attrs.align) ? attrs.align : "left"
        dom.dataset.align = align
        imageElement.setAttribute("data-align", align)

        const parsedWidth =
          typeof attrs.width === "number"
            ? attrs.width
            : typeof attrs.width === "string"
              ? Number.parseInt(attrs.width, 10)
              : Number.NaN

        if (Number.isFinite(parsedWidth) && parsedWidth > 0) {
          const width = Math.round(parsedWidth)
          imageElement.style.width = `${width}px`
          imageElement.setAttribute("width", String(width))
        } else {
          imageElement.style.removeProperty("width")
          imageElement.removeAttribute("width")
        }
      }

      const updateImageWidth = (nextWidth: number) => {
        const position = getNodePosition()
        if (position === null) return

        editor
          .chain()
          .focus()
          .command(({ tr, state }) => {
            const nodeAtPosition = state.doc.nodeAt(position)
            if (!nodeAtPosition || nodeAtPosition.type.name !== "image") return false

            tr.setNodeMarkup(position, undefined, {
              ...nodeAtPosition.attrs,
              width: nextWidth,
            })
            return true
          })
          .run()
      }

      let isResizing = false
      let activeResizeDirection: ResizeDirection | null = null
      let startX = 0
      let startY = 0
      let startWidth = 0

      const getWidthDeltaFromPointer = (
        direction: ResizeDirection,
        deltaX: number,
        deltaY: number,
      ) => {
        const horizontalDelta = direction.includes("e")
          ? deltaX
          : direction.includes("w")
            ? -deltaX
            : 0

        const verticalDelta = direction.includes("s")
          ? deltaY
          : direction.includes("n")
            ? -deltaY
            : 0

        if (horizontalDelta !== 0 && verticalDelta !== 0) {
          return (horizontalDelta + verticalDelta) / 2
        }

        return horizontalDelta !== 0 ? horizontalDelta : verticalDelta
      }

      const onPointerMove = (event: PointerEvent) => {
        if (!isResizing || !activeResizeDirection) return

        const parentWidth = dom.parentElement?.clientWidth ?? window.innerWidth
        const widthDelta = getWidthDeltaFromPointer(
          activeResizeDirection,
          event.clientX - startX,
          event.clientY - startY,
        )
        const nextWidth = Math.min(
          Math.max(startWidth + widthDelta, MIN_IMAGE_WIDTH_PX),
          parentWidth,
        )

        imageElement.style.width = `${Math.round(nextWidth)}px`
      }

      const stopResize = () => {
        if (!isResizing) return

        isResizing = false
        dom.classList.remove("is-resizing")
        document.removeEventListener("pointermove", onPointerMove)
        document.removeEventListener("pointerup", stopResize)
        document.removeEventListener("pointercancel", stopResize)
        activeResizeDirection = null

        const resizedWidth = Math.max(
          MIN_IMAGE_WIDTH_PX,
          Math.round(imageElement.getBoundingClientRect().width),
        )
        updateImageWidth(resizedWidth)
      }

      const onResizeStart = (event: PointerEvent) => {
        const target = event.currentTarget as HTMLElement | null
        const direction = target?.dataset.resizeDirection
        if (!isResizeDirection(direction)) return

        event.preventDefault()
        event.stopPropagation()

        const position = getNodePosition()
        if (position !== null) {
          editor.chain().focus().setNodeSelection(position).run()
        }

        isResizing = true
        activeResizeDirection = direction
        dom.classList.add("is-resizing")
        startX = event.clientX
        startY = event.clientY
        startWidth = imageElement.getBoundingClientRect().width || MIN_IMAGE_WIDTH_PX

        document.addEventListener("pointermove", onPointerMove)
        document.addEventListener("pointerup", stopResize)
        document.addEventListener("pointercancel", stopResize)
      }

      const onSelectImage = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null
        if (target?.closest(".tiptap-image-resize-handle")) return

        const position = getNodePosition()
        if (position !== null) {
          editor.chain().focus().setNodeSelection(position).run()
        }
      }

      resizeHandles.forEach((handle) => {
        handle.addEventListener("pointerdown", onResizeStart)
      })
      dom.addEventListener("mousedown", onSelectImage)

      syncImageAttributes()

      return {
        dom,
        update: (updatedNode) => {
          if (updatedNode.type.name !== currentNode.type.name) return false
          currentNode = updatedNode
          syncImageAttributes()
          return true
        },
        selectNode: () => {
          dom.classList.add("is-selected")
        },
        deselectNode: () => {
          dom.classList.remove("is-selected")
        },
        stopEvent: (event) => {
          if (isResizing) return true
          const target = event.target as HTMLElement | null
          return Boolean(target?.closest(".tiptap-image-resize-handle"))
        },
        ignoreMutation: (mutation) => {
          return mutation.type === "attributes" && mutation.target === imageElement
        },
        destroy: () => {
          stopResize()
          resizeHandles.forEach((handle) => {
            handle.removeEventListener("pointerdown", onResizeStart)
          })
          dom.removeEventListener("mousedown", onSelectImage)
        },
      }
    }
  },
})

export function RichTextEditor({
  value,
  onChange,
  allowImage = false,
}: {
  value: string
  onChange: (v: string) => void
  allowImage?: boolean
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      ImageNode,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const imageInputRef = useRef<HTMLInputElement>(null)

  // 🔁 Atualiza o conteúdo quando value mudar
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false)
    }
  }, [value, editor])

  
  useEffect(() => {
    if (!editor) return

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return
      event.preventDefault()
      editor.commands.insertContent("\u00A0\u00A0\u00A0\u00A0") // 4 espaços
    }

    const editorEl = editor.view.dom
    editorEl?.addEventListener("keydown", handleTab)

    return () => editorEl?.removeEventListener("keydown", handleTab)
  }, [editor])

  const insertImageFromFile = useCallback(
    async (file: File, position?: number) => {
      if (!editor || !allowImage) return

      if (!isImageFile(file)) {
        window.alert("Selecione um arquivo de imagem válido.")
        return
      }

      try {
        const src = await readImageAsDataURL(file)
        const chain = editor.chain().focus()

        if (typeof position === "number") {
          chain.setTextSelection(position)
        }

        chain
          .insertContent({
            type: "image",
            attrs: {
              src,
              alt: file.name,
              title: file.name,
            },
          })
          .run()
      } catch {
        window.alert("Não foi possível carregar a imagem selecionada.")
      }
    },
    [allowImage, editor],
  )

  const insertImagesFromFiles = useCallback(
    async (files: File[], position?: number) => {
      if (!editor || !allowImage) return

      const imageFiles = uniqFiles(files.filter(isImageFile))
      if (!imageFiles.length) return

      let insertPosition = position

      for (const file of imageFiles) {
        await insertImageFromFile(file, insertPosition)
        if (typeof insertPosition === "number") {
          insertPosition += 1
        }
      }
    },
    [allowImage, editor, insertImageFromFile],
  )

  useEffect(() => {
    if (!editor || !allowImage) return

    const editorEl = editor.view.dom

    const handleDragOver = (event: DragEvent) => {
      const transferTypes = Array.from(event.dataTransfer?.types ?? [])
      if (transferTypes.includes("Files")) {
        event.preventDefault()
      }
    }

    const handleDrop = (event: DragEvent) => {
      const files = Array.from(event.dataTransfer?.files ?? []).filter(isImageFile)
      if (!files.length) return

      event.preventDefault()
      const dropPosition = editor.view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      })?.pos

      void insertImagesFromFiles(files, dropPosition)
    }

    const handlePaste = (event: ClipboardEvent) => {
      const clipboardFiles = Array.from(event.clipboardData?.files ?? [])
      const clipboardItems = Array.from(event.clipboardData?.items ?? [])
        .map((item) => (item.kind === "file" ? item.getAsFile() : null))
        .filter((file): file is File => file !== null)

      const files = [...clipboardFiles, ...clipboardItems].filter(isImageFile)
      if (!files.length) return

      event.preventDefault()
      void insertImagesFromFiles(files)
    }

    editorEl.addEventListener("dragover", handleDragOver)
    editorEl.addEventListener("drop", handleDrop)
    editorEl.addEventListener("paste", handlePaste)

    return () => {
      editorEl.removeEventListener("dragover", handleDragOver)
      editorEl.removeEventListener("drop", handleDrop)
      editorEl.removeEventListener("paste", handlePaste)
    }
  }, [allowImage, editor, insertImagesFromFiles])

  const handleInsertImage = useCallback(() => {
    if (!allowImage) return
    imageInputRef.current?.click()
  }, [allowImage])

  const handleImageSelected = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.target.value = ""
      if (!file) return

      await insertImagesFromFiles([file])
    },
    [insertImagesFromFiles],
  )

  return (
    <div id="rich-text-editor" className="w-full">
      <MenuBar editor={editor} onInsertImage={allowImage ? handleInsertImage : undefined} />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelected}
        className="hidden"
      />
      <EditorContent
        editor={editor}
        className="border rounded-md p-2 bg-white min-h-[150px]"
      />
    </div>
  )
}
