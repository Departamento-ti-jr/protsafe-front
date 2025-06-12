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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Documentos comprobatórios</h1>
      </div>

      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar documentos..."
            className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="ml-auto">
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Enviar Documento
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categorias.map((categoria) => (
          <Card key={categoria} className="cursor-pointer hover:bg-gray-50 transition-colors border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-900">{categoria}</h3>
              <p className="text-sm text-gray-500 mt-1">Clique para visualizar</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="icon" disabled>
          &lt;
        </Button>
        <Button size="sm">1</Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="icon">
          &gt;
        </Button>
      </div>
    </div>
  )
}
