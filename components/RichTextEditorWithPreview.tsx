"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Props = {
  label?: string;
  initialValue?: string;
  onChange?: (html: string) => void;
};

export default function RichTextEditorWithPreview({
  label = "Detalhamento do Motivo",
  initialValue = "",
  onChange,
}: Props) {
  const [value, setValue] = useState("");
  const isProgrammaticChange = useRef(false); // 🔹 flag para distinguir mudanças vindas de fora

  // 🧩 Quando vem um novo texto do pai (como ao selecionar motivo)
  useEffect(() => {
    if (initialValue) {
      let normalized = initialValue
        .replace(/&nbsp;/g, " ")
        .replace(/<br\s*\/?>/g, "</p><p>");

      if (!normalized.trim().startsWith("<p>")) {
        normalized = `<p>${normalized}</p>`;
      }

      if (normalized !== value) {
        isProgrammaticChange.current = true; // ✅ marca que vem do pai
        setValue(normalized);
      }
    } else {
      setValue("");
    }
  }, [initialValue]);

  // 🔄 Durante digitação no editor
  const handleChange = (html: string) => {
  setValue(html);

  if (isProgrammaticChange.current) {
    isProgrammaticChange.current = false;
    return;
  }

  // ✅ Substitui apenas espaços no INÍCIO de cada linha/parágrafo
  const htmlComNbsp = html
    // Substitui espaços após <p>, <br>, ou início da string
    .replace(/(^|\<p\>|\<br\s*\/?\>)(\s+)/g, (match, prefix, spaces) => {
      const nbsp = spaces.replace(/ /g, "&nbsp;");
      return `${prefix}${nbsp}`;
    });

  onChange?.(htmlComNbsp);
};

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["clean"],
    ],
    keyboard: {
      bindings: {
        tab: {
          key: 9,
          handler: function (range: any) {
            const quill = this.quill;
            quill.insertText(range.index, "    "); // 4 espaços
            quill.setSelection(range.index + 4, 0);
            return false;
          },
        },
      },
    },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "align",
  ];

  // Apenas para mostrar o HTML com &nbsp; no painel
  const htmlComNbsp = value
    .replace(/  /g, "&nbsp;&nbsp;")
    .replace(/ (?=[^<>]*(?:<|$))/g, "&nbsp;");

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">{label}</label>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Digite aqui o texto..."
        className="bg-white rounded-md text-sm"
      />

      <div className="border rounded-md p-4 bg-gray-50">
        <p className="text-xs text-muted-foreground mb-2 font-medium">
          Visualização:
        </p>
        <div
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: value || "<p><i>(vazio)</i></p>",
          }}
        />
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-1 font-medium">
          HTML gerado (enviado à API):
        </p>
        <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-auto whitespace-pre-wrap border">
          {htmlComNbsp || "<p><i>(vazio)</i></p>"}
        </pre>
      </div>
    </div>
  );
}
