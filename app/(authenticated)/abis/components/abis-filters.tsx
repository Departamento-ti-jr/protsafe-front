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
    <div className="flex flex-col lg:flex-row gap-4 justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar por ABI, Processo ou Operadora..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary h-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-tight">Status:</span>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[160px] bg-white border-slate-200 h-10 shadow-sm">
              <SelectValue placeholder="Filtrar Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos text-slate-600">Todos os Status</SelectItem>
              <SelectItem value="aberto">🟢 Aberto</SelectItem>
              <SelectItem value="em-andamento">🔵 Em Andamento</SelectItem>
              <SelectItem value="fechado">⚪ Fechado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block" />

        <Link href="/abis/nova">
          <Button className="h-10 px-5 shadow-sm hover:shadow-md transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Nova ABI
          </Button>
        </Link>
      </div>
    </div>
  )
}
