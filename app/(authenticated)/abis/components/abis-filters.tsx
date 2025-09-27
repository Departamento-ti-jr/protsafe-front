'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Props {
  searchTerm: string
  onSearch: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

export default function AbisFilters({ searchTerm, onSearch, statusFilter, onStatusChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      {/* Search */}
      <div className="relative w-full md:flex-1">
        <Search
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
            "text-muted-foreground"
          )}
        />
        <Input
          placeholder="Buscar ABIs..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className={cn(
            // garante cores do tema, evitando fundo escuro
            "pl-9 h-9 text-sm",
            "bg-background text-foreground",
            "border border-input",
            "placeholder:text-muted-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
          )}
        />
      </div>

      {/* Filtros e botão */}
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger
            className={cn(
              "w-full md:w-[180px] h-9",
              // força tokens do tema no trigger também
              "bg-background text-foreground border border-input",
              "placeholder:text-muted-foreground",
              "focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
            )}
          >
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground border border-border">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="aberto">Aberto</SelectItem>
            <SelectItem value="fechado">Fechado</SelectItem>
            <SelectItem value="em-andamento">Em Andamento</SelectItem>
          </SelectContent>
        </Select>

        <Link href="/abis/nova">
          <Button className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            Nova ABI
          </Button>
        </Link>
      </div>
    </div>
  )
}
