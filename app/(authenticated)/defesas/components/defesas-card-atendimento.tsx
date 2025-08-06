import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Abi } from "@/lib/services/abis.service";


interface DefesasAtendimentoProps {
    abi?: Abi
}

export default function DefesaCardAtendimento({abi} : DefesasAtendimentoProps) {

    return (<Card>
        <CardHeader>
          <CardTitle>Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Status</Label>
              {/* <p className="font-medium">{abi?.status}</p> */}
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Competência</Label>
              <p className="font-medium">{abi?.competencia}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Tipo</Label>
              <p className="font-medium">{abi?.tipo}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Data Inicial</Label>
              <p className="font-medium">{abi?.dataInicioAtendimento}</p>
            </div>
          </div>
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-500">Data Final</Label>
            <p className="font-medium">{abi?.dataFimAtendimento}</p>
          </div>
        </CardContent>
      </Card>);
}