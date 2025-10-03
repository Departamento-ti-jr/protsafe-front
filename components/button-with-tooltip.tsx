"use client"

import { ReactNode } from "react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface TooltipButtonProps {
  tooltip: string
  children: ReactNode
  disabled?: boolean
}

export function TooltipButton({ tooltip, children, disabled }: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {disabled ? (
          <span className="inline-flex cursor-not-allowed">{children}</span>
        ) : (
          children
        )}
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
