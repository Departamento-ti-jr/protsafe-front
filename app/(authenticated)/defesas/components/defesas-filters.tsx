"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar defesas..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Buscar
      </Button>
    </form>
  )
}
