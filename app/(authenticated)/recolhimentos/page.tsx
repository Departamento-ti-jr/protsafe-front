import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Plus, Search } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function RecolhimentosPage() {
  // Dados de exemplo
  const recolhimentos = [
    {
      id: "001",
      dataDocumento: "15-05-2025",
      dataVencimento: "30-05-2025",
      nomeOperadora: "AMAZÔNIA PLANOS DE SAÚDE LTDA",
      valor: "R$ 12.450,00",
    },
    {
      id: "002",
      dataDocumento: "10-05-2025",
      dataVencimento: "25-05-2025",
      nomeOperadora: "HOSPITAL MARECHAL CÂNDIDO RONDON LTDA",
      valor: "R$ 8.750,00",
    },
    {
      id: "003",
      dataDocumento: "05-05-2025",
      dataVencimento: "20-05-2025",
      nomeOperadora: "HUMANA SAÚDE NORDESTE LTDA",
      valor: "R$ 15.320,00",
    },
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-resus-secondary to-resus-primary bg-clip-text text-transparent">
          Recolhimentos
        </h1>
        <p className="text-resus-secondary/70">Gerencie os recolhimentos do sistema</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center py-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-resus-primary" />
          <Input
            placeholder="Número..."
            className="pl-10 border-resus-primary/30 focus:border-resus-primary focus:ring-resus-primary/20 rounded-xl bg-white/50 backdrop-blur-sm"
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <CalendarIcon className="mr-2 h-4 w-4" />
                De
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-xl">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Até
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>

          <Button className="rounded-xl shadow-lg">
            <Plus className="mr-2 h-4 w-4" /> Novo Recolhimento
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-resus-primary/10 to-resus-accent/10 border-b border-resus-primary/20">
              <TableHead className="font-semibold text-resus-secondary">Data Documento</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Data Vencimento</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Nome Operadora</TableHead>
              <TableHead className="font-semibold text-resus-secondary">Valor</TableHead>
              <TableHead className="font-semibold text-resus-secondary text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-gradient-to-r hover:from-resus-primary/5 hover:to-resus-accent/5 transition-all duration-200 border-b border-gray-100">
              <TableCell colSpan={5} className="text-center py-6 text-resus-secondary/60">
                Nenhum registro encontrado
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Paginação modernizada */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="icon" disabled className="rounded-xl">
          &lt;
        </Button>
        <Button size="sm" className="rounded-xl">
          1
        </Button>
        <Button variant="outline" size="sm" className="rounded-xl">
          2
        </Button>
        <Button variant="outline" size="sm" className="rounded-xl">
          3
        </Button>
        <Button variant="outline" size="icon" className="rounded-xl">
          &gt;
        </Button>
      </div>
    </div>
  )
}
