import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Upload } from "lucide-react"

export default function DocumentosComprobatoriosPage() {
  // Dados de exemplo baseados na imagem fornecida
  const categorias = [
    "Auditoria em prontuário",
    "Declaração de Saúde",
    "Declaração de vínculo",
    "Demonstrativo",
    "Fatura",
    "Inclusão",
    "Print Sistema",
    "Proposta de adesão",
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-resus-secondary to-resus-primary bg-clip-text text-transparent">
          Documentos comprobatórios
        </h1>
        <p className="text-resus-secondary/70">Gerencie os documentos comprobatórios do sistema</p>
      </div>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-resus-primary" />
          <Input
            placeholder="Buscar documentos..."
            className="pl-10 border-resus-primary/30 focus:border-resus-primary focus:ring-resus-primary/20 rounded-xl bg-white/50 backdrop-blur-sm"
          />
        </div>
        <div className="ml-auto">
          <Button className="rounded-xl shadow-lg">
            <Upload className="mr-2 h-4 w-4" /> Enviar Documento
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categorias.map((categoria) => (
          <Card
            key={categoria}
            className="cursor-pointer hover:bg-gradient-to-r hover:from-resus-primary/5 hover:to-resus-accent/5 transition-all duration-200 border-resus-primary/20 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm"
          >
            <CardContent className="p-6">
              <h3 className="font-medium text-resus-secondary">{categoria}</h3>
              <p className="text-sm text-resus-secondary/60 mt-1">Clique para visualizar</p>
            </CardContent>
          </Card>
        ))}
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
