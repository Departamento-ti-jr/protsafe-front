import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Abi } from "@/lib/services/abis.service"

interface AbiDetailsCardProps {
  abi: Abi
}

export function AbiDetailsCard({ abi }: AbiDetailsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes da ABI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Número da ABI</p>
            <p className="font-semibold">{abi.numeroAbi}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Número do Processo</p>
            <p className="font-semibold">{abi.numeroProcesso}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Nome da Operadora</p>
            <p className="font-semibold">{abi?.operadoraNome}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">CNPJ</p>
            <p className="font-semibold">{abi.operadora?.CNPJ}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Data / Hora de Registro</p>
            <p className="font-semibold">{new Date().toLocaleString("pt-BR")}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Registro ANS</p>
            <p className="font-semibold">{abi?.registroAns}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <Badge variant="secondary" className="bg-teal-100 text-teal-800">
              Aberto
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
