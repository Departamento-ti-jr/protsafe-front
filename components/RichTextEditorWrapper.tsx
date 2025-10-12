"use client";
import dynamic from "next/dynamic";

type Props = {
  initialValue?: string;
  onChange?: (html: string) => void;
};

const RichTextEditorClient = dynamic(
  () => import("@/components/RichTextEditorClient"),
  { ssr: false }
);

export default function RichTextEditorWrapper(props: Props) {
  return <RichTextEditorClient {...props} />;
}
