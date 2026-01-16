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
  numeroAbi: string
  onNumeroAbiChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

export default function AbisFilters({
  searchTerm,
  onSearch,
  numeroAbi,
  onNumeroAbiChange,
  statusFilter,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between">
      <div className="flex w-full flex-col gap-3 lg:max-w-2xl lg:flex-row">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por ABI, Processo ou Operadora..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary h-10"
          />
        </div>
        <div className="relative w-full lg:max-w-xs">
          <Input
            placeholder="Numero da ABI"
            inputMode="numeric"
            value={numeroAbi}
            onChange={(e) => onNumeroAbiChange(e.target.value)}
            className="bg-slate-50/50 border-slate-200 focus-visible:ring-primary h-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
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
