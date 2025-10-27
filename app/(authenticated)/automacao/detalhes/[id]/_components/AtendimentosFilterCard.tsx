import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { DEFESA_STATUS_OPTIONS } from "@/lib/enums/defesa-status"

interface AtendimentosFilterCardProps {
  searchTerm: string
  onSearchChange: (v: string) => void
  statusFilter: string[]
  onStatusChange: (v: string[]) => void
}

export function AtendimentosFilterCard({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: AtendimentosFilterCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros de Atendimentos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por texto..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2">
          <MultiSelect
            options={DEFESA_STATUS_OPTIONS}
            value={statusFilter}
            onChange={onStatusChange}
            placeholder="Filtrar por status..."
          />
        </div>
      </CardContent>
    </Card>
  )
}
