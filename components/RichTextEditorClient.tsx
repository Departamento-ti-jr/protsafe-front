"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type Props = {
  initialValue?: string;
  onChange?: (html: string) => void;
};

export default function RichTextEditorClient({ initialValue = "", onChange }: Props) {
  const editorRef = useRef<any>(null);
  const readyRef = useRef(false);

  // inicializa editor quando o script carrega
  const handleReady = () => {
    if (typeof window !== "undefined" && (window as any).RichTextEditor) {
      const cfg = { toolbar: "basic" };
      editorRef.current = new (window as any).RichTextEditor("#div_editor1", cfg);

      // valor inicial
      if (initialValue) {
        editorRef.current.setHTMLCode(initialValue);
      }

      // escuta mudanças
      editorRef.current.attachEvent("change", () => {
        const html = editorRef.current.getHTMLCode();
        onChange?.(html);
      });

      readyRef.current = true;
      console.log("✅ RichTextEditor inicializado");
    } else {
      console.warn("⚠️ RichTextEditor ainda não disponível");
    }
  };

  // atualiza conteúdo do editor quando initialValue muda
  useEffect(() => {
    if (readyRef.current && editorRef.current) {
      const currentHtml = editorRef.current.getHTMLCode();
      if (initialValue && initialValue !== currentHtml) {
        editorRef.current.setHTMLCode(initialValue);
        console.log("🔄 RichTextEditor sincronizado com React");
      }
    }
  }, [initialValue]);

  return (
    <>
      <link rel="stylesheet" href="/richtexteditor/rte_theme_default.css" />
      <Script src="/richtexteditor/rte.js" strategy="afterInteractive" onLoad={handleReady} />
      <Script src="/richtexteditor/plugins/all_plugins.js" strategy="afterInteractive" />
      <div id="div_editor1" />
    </>
  );
}
