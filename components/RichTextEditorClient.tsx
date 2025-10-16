"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type Props = {
  initialValue?: string;
  onChange?: (html: string) => void;
};

export default function RichTextEditorClient({ initialValue = "", onChange }: Props) {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastExternalValue = useRef(initialValue);

  const initEditor = () => {
    if (typeof window === "undefined") return;
    const RTE = (window as any).RichTextEditor;
    if (!RTE || !containerRef.current) return;

    if (editorRef.current?.dispose) {
      try {
        editorRef.current.dispose();
      } catch {}
    }

    const cfg = { toolbar: "basic" };
    editorRef.current = new RTE(containerRef.current, cfg);

    // ⚙️ Define valor inicial apenas uma vez
    if (initialValue) {
      editorRef.current.setHTMLCode(initialValue);
      lastExternalValue.current = initialValue;
    }

    // 🧩 Escuta alterações do usuário
    editorRef.current.attachEvent("change", () => {
      const html = editorRef.current.getHTMLCode();
      if (html !== lastExternalValue.current) {
        onChange?.(html);
      }
    });

    console.log("✅ RichTextEditor inicializado");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const RTE = (window as any).RichTextEditor;

    if (RTE) {
      initEditor();
    } else {
      const interval = setInterval(() => {
        if ((window as any).RichTextEditor) {
          clearInterval(interval);
          initEditor();
        }
      }, 200);
      return () => clearInterval(interval);
    }

    // limpa ao desmontar
    return () => {
      if (editorRef.current?.dispose) {
        try {
          editorRef.current.dispose();
          editorRef.current = null;
          console.log("🧹 Editor destruído ao desmontar");
        } catch {}
      }
    };
  }, []); // ← ⚠️ apenas na montagem, não depende de initialValue

  // 🔹 Sincroniza editor com valor externo apenas se mudou externamente
  useEffect(() => {
    if (!editorRef.current) return;
    if (initialValue !== lastExternalValue.current) {
      editorRef.current.setHTMLCode(initialValue);
      lastExternalValue.current = initialValue;
      console.log("🔄 Atualizado com novo initialValue externo");
    }
  }, [initialValue]);

  return (
    <>
      <link rel="stylesheet" href="/richtexteditor/rte_theme_default.css" />
      <Script src="/richtexteditor/rte.js" strategy="afterInteractive" />
      <Script src="/richtexteditor/plugins/all_plugins.js" strategy="afterInteractive" />
      <div ref={containerRef} />
    </>
  );
}
