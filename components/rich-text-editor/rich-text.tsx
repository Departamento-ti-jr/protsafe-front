"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface RichTextProps {
  content: string
  className?: string
}

export function RichText({ content, className }: RichTextProps) {
  const sanitized = React.useMemo(() => {
    let html = content
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/on\w+="[^"]*"/gi, "")
    html = html
      .replace(/<h1>/g, '<h1 class="text-3xl font-bold mb-4">')
      .replace(/<p>/g, '<p class="mb-2 leading-relaxed">')
    return html
  }, [content])

  return <div className={cn("prose max-w-none", className)} dangerouslySetInnerHTML={{ __html: sanitized }} />
}
