'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  searchTerm: string
  onSearch: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
}

export default function AbisFilters({ searchTerm, onSearch, statusFilter, onStatusChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar ABIs..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="aberto">Aberto</SelectItem>
            <SelectItem value="fechado">Fechado</SelectItem>
            <SelectItem value="em-andamento">Em Andamento</SelectItem>
          </SelectContent>
        </Select>
        <Link href={`/abis/nova`}>
          <Button><Plus className="mr-2 h-4 w-4" /> Nova ABI</Button>
        </Link>
      </div>
    </div>
  )
}
