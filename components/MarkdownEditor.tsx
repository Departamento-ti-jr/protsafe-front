import React, { useRef, useEffect, useCallback } from "react";
import DOMPurify from "dompurify";

type HtmlEditorProps = {
  value?: string;
  onChange?: (html: string) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
};

export default function HtmlEditor({
  value = "",
  onChange,
  readOnly = false,
  className = "",
  placeholder = "Digite aqui...",
}: HtmlEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const lastValueRef = useRef<string>("");

  useEffect(() => {
    if (editorRef.current && value && value !== lastValueRef.current) {
      editorRef.current.innerHTML = sanitize(value);
      lastValueRef.current = value;
    }
  }, [value]);

  const exec = useCallback(
    (command: string, value?: string) => {
      if (readOnly) return;
      document.execCommand(command, false, value ?? undefined);
      editorRef.current?.focus();
    },
    [readOnly]
  );

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    const html = sanitize(editorRef.current.innerHTML);
    lastValueRef.current = html;
    onChange?.(html);
  }, [onChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, sanitize(text));
  }, []);

  const makeLink = useCallback(() => {
    if (readOnly) return;
    const url = prompt("Insira a URL (com http/https):", "https://");
    if (url) exec("createLink", url);
  }, [exec, readOnly]);

  const clearFormatting = useCallback(() => {
    if (readOnly) return;
    exec("removeFormat");
  }, [exec, readOnly]);

  // 👉 NOVO: suporte ao TAB e SHIFT+TAB
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab" && !readOnly) {
      e.preventDefault();
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);

      // caractere de indentação (8 espaços não colapsáveis)
      const indent = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";

      if (e.shiftKey) {
        // SHIFT + TAB → remove indentação anterior
        const node = range.startContainer;
        if (node.nodeType === Node.TEXT_NODE) {
          const textNode = node as Text;
          const offset = range.startOffset;
          const before = textNode.data.substring(0, offset);
          const after = textNode.data.substring(offset);
          if (before.endsWith(indent)) {
            textNode.data = before.slice(0, -indent.length) + after;
            const newOffset = offset - indent.length;
            range.setStart(textNode, newOffset);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else {
        // TAB → adiciona indentação
        const span = document.createElement("span");
        span.innerHTML = indent;
        const frag = document.createDocumentFragment();
        while (span.firstChild) {
          frag.appendChild(span.firstChild);
        }
        range.insertNode(frag);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, [readOnly]);

  return (
    <div className={"w-full mx-auto " + className}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center border rounded-t-lg px-3 py-2 bg-gray-50">
        <ToolbarButton label="B" title="Negrito" onClick={() => exec("bold")} className="font-bold" />
        <ToolbarButton label={<i>I</i>} title="Itálico" onClick={() => exec("italic")} />
        <ToolbarButton label={<u>U</u>} title="Sublinhado" onClick={() => exec("underline")} />
        <span className="mx-2 h-6 w-px bg-gray-300" />
        <ToolbarButton label="H1" title="Título 1" onClick={() => exec("formatBlock", "<h1>")} />
        <ToolbarButton label="H2" title="Título 2" onClick={() => exec("formatBlock", "<h2>")} />
        <ToolbarButton label="P" title="Parágrafo" onClick={() => exec("formatBlock", "<p>")} />
        <span className="mx-2 h-6 w-px bg-gray-300" />
        <ToolbarButton label="UL" title="Lista não-ordenada" onClick={() => exec("insertUnorderedList")} />
        <ToolbarButton label="OL" title="Lista ordenada" onClick={() => exec("insertOrderedList")} />
        <ToolbarButton label="Link" title="Inserir Link" onClick={makeLink} />
        <ToolbarButton label="Limpar" title="Remover formatação" onClick={clearFormatting} />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown} // 👈 aqui está o evento do Tab
        suppressContentEditableWarning
        data-placeholder={placeholder}
        className="min-h-[200px] border-x border-b rounded-b-lg p-3 focus:outline-none whitespace-pre-wrap prose max-w-none"
      />
    </div>
  );
}

function ToolbarButton({
  label,
  title,
  onClick,
  className = "",
}: {
  label: React.ReactNode;
  title?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={
        "px-2 py-1 rounded border bg-white hover:bg-gray-100 active:scale-[0.98] transition-all text-sm " +
        className
      }
    >
      {label}
    </button>
  );
}

function sanitize(inputHtml: string) {
  return DOMPurify.sanitize(inputHtml, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "i",
      "u",
      "strong",
      "em",
      "s",
      "span",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "a",
      "h1",
      "h2",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "id", "title"],
  });
}
