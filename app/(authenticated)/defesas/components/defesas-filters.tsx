"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FilterX } from "lucide-react"
import { useState } from "react"

interface DefesasFiltersProps {
  searchTerm: string
  onSearch: (term: string) => void
}

export default function DefesasFilters({ searchTerm, onSearch }: DefesasFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localSearch)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <form onSubmit={handleSubmit} className="relative w-full md:max-w-md flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar por ABI, Ofício ou AIH..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary h-10"
          />
        </div>
        <Button type="submit" size="sm" className="h-10 px-6 shadow-sm">
          Buscar
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => { setLocalSearch(""); onSearch(""); }}
          className="text-slate-500 border-slate-200 hover:bg-slate-50"
        >
          <FilterX className="h-4 w-4 mr-2" />
          Limpar Filtros
        </Button>
      </div>
    </div>
  )
}