'use client'

import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  id: string
  onIdChange: (value: string) => void
  numeroAbi: string
  onNumeroAbiChange: (value: string) => void
  numeroProcesso: string
  onNumeroProcessoChange: (value: string) => void
  operadora: string
  onOperadoraChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

export default function AbisFilters({
  id,
  onIdChange,
  numeroAbi,
  onNumeroAbiChange,
  numeroProcesso,
  onNumeroProcessoChange,
  operadora,
  onOperadoraChange,
  statusFilter,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between">
      <div className="grid w-full gap-3 lg:grid-cols-4">
        <Input
          placeholder="Numero da ABI"
          inputMode="numeric"
          value={numeroAbi}
          onChange={(e) => onNumeroAbiChange(e.target.value)}
          className="bg-slate-50/50 border-slate-200 focus-visible:ring-primary h-10"
        />
        <Input
          placeholder="Numero do processo"
          value={numeroProcesso}
          onChange={(e) => onNumeroProcessoChange(e.target.value)}
          className="bg-slate-50/50 border-slate-200 focus-visible:ring-primary h-10"
        />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Operadora"
            value={operadora}
            onChange={(e) => onOperadoraChange(e.target.value)}
            className="pl-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary h-10"
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
