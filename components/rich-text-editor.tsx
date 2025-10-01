"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (value: string) => void;
};

type Props = {
  value?: string;
  onChange?: (content: string) => void;
};

const RichTextEditor = forwardRef<RichTextEditorHandle, Props>(
  ({ value, onChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          },
          placeholder: "Write something...",
        });

        // dispara onChange sempre que muda
        quillRef.current.on("text-change", () => {
          const content = quillRef.current?.root.innerHTML || "";
          if (onChange) onChange(content);
        });
      }

      return () => {
        quillRef.current = null;
      };
    }, [onChange]);

    // sincroniza valor vindo da prop
    useEffect(() => {
      if (quillRef.current && value !== undefined) {
        const currentContent = quillRef.current.root.innerHTML;
        if (value !== currentContent) {
          quillRef.current.root.innerHTML = value;
        }
      }
    }, [value]);

    useImperativeHandle(ref, () => ({
      getContent: () => {
        return quillRef.current?.root.innerHTML || "";
      },
      setContent: (val: string) => {
        if (quillRef.current) {
          quillRef.current.root.innerHTML = val;
        }
      },
    }));

    return <div ref={editorRef} style={{ height: "300px" }} />;
  }
);

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
