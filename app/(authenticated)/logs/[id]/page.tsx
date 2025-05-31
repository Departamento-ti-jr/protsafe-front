import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LogDetalhesPage({ params }: { params: { id: string } }) {
  // Dados de exemplo baseados na imagem fornecida [^2]
  const log = {
    id: params.id,
    data: "01-05-2025",
    hora: "09:01:24",
    descricao: "Defesa Nº 0 para o atendimento de Nº 51078 foi inserido pelo usuario: Camila!",
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/logs">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Visualizar Log</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log #{log.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Data</p>
              <p>{log.data}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Hora</p>
              <p>{log.hora}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Descrição</p>
            <p className="mt-1">{log.descricao}</p>
          </div>
          <div className="flex justify-end pt-4">
            <Button>Salvar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
