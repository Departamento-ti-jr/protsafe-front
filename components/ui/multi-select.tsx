import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  value: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function MultiSelect({ options, value, onChange, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const toggleValue = (val: string) => {
    onChange(
      value.includes(val) ? value.filter((v) => v !== val) : [...value, val]
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {value.length > 0
            ? `${value.length} selecionado${value.length > 1 ? "s" : ""}`
            : placeholder || "Selecionar..."}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-2 space-y-1">
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => toggleValue(opt.value)}
            className={cn(
              "flex items-center gap-2 px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100",
              value.includes(opt.value) && "bg-gray-100"
            )}
          >
            <Check className={cn("h-4 w-4", !value.includes(opt.value) && "opacity-0")} />
            <span>{opt.label}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
