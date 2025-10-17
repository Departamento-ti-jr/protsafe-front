import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Highlighter,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const options = [
    { icon: <Bold className="size-4" />, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { icon: <Italic className="size-4" />, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { icon: <Strikethrough className="size-4" />, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike") },
    { icon: <AlignLeft className="size-4" />, action: () => editor.chain().focus().setTextAlign("left").run(), active: editor.isActive({ textAlign: "left" }) },
    { icon: <AlignCenter className="size-4" />, action: () => editor.chain().focus().setTextAlign("center").run(), active: editor.isActive({ textAlign: "center" }) },
    { icon: <AlignRight className="size-4" />, action: () => editor.chain().focus().setTextAlign("right").run(), active: editor.isActive({ textAlign: "right" }) },
    { icon: <List className="size-4" />, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { icon: <ListOrdered className="size-4" />, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { icon: <Highlighter className="size-4" />, action: () => editor.chain().focus().toggleHighlight().run(), active: editor.isActive("highlight") },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2">
      {options.map((opt, i) => (
        <Toggle key={i} pressed={opt.active} onPressedChange={opt.action}>
          {opt.icon}
        </Toggle>
      ))}
    </div>
  );
}
