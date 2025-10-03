import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ButtonWithTooltip({ tooltip, children }: { tooltip: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
          {children}
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
