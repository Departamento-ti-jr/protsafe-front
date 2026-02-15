import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ImagePlus,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Highlighter,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({
  editor,
  onInsertImage,
}: {
  editor: Editor | null
  onInsertImage?: () => void
}) {
  if (!editor) return null;

  const isImageSelection = () => editor.isActive("image");

  const applyAlignment = (alignment: "left" | "center" | "right") => {
    if (isImageSelection()) {
      editor.chain().focus().updateAttributes("image", { align: alignment }).run();
      return;
    }

    editor.chain().focus().setTextAlign(alignment).run();
  };

  const isAlignmentActive = (alignment: "left" | "center" | "right") => {
    if (isImageSelection()) {
      return editor.isActive("image", { align: alignment });
    }

    return editor.isActive({ textAlign: alignment });
  };

  const options = [
    { icon: <Bold className="size-4" />, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { icon: <Italic className="size-4" />, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { icon: <Strikethrough className="size-4" />, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike") },
    { icon: <AlignLeft className="size-4" />, action: () => applyAlignment("left"), active: isAlignmentActive("left") },
    { icon: <AlignCenter className="size-4" />, action: () => applyAlignment("center"), active: isAlignmentActive("center") },
    { icon: <AlignRight className="size-4" />, action: () => applyAlignment("right"), active: isAlignmentActive("right") },
    { icon: <List className="size-4" />, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { icon: <ListOrdered className="size-4" />, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { icon: <Highlighter className="size-4" />, action: () => editor.chain().focus().toggleHighlight().run(), active: editor.isActive("highlight") },
    { icon: <ImagePlus className="size-4" />, action: () => onInsertImage?.(), active: false, disabled: !onInsertImage },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2">
      {options.map((opt, i) => (
        <Toggle key={i} pressed={opt.active} onPressedChange={opt.action} disabled={opt.disabled}>
          {opt.icon}
        </Toggle>
      ))}
    </div>
  );
}
