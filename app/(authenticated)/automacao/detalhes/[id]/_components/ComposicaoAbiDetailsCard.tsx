import { Badge } from "@/components/ui/badge"
import { ClipboardList, Hash, Layers, Activity } from "lucide-react"

export function ComposicaoAbiDetailsCard({ numeroAbi, registroAns, totalRegistros }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DetailItem icon={<Hash className="text-blue-500"/>} label="Número da ABI" value={numeroAbi} />
      <DetailItem icon={<Hash className="text-blue-500"/>} label="Registro ANS" value={registroAns} />
      <DetailItem icon={<Hash className="text-blue-500"/>} label="Total de Registros" value={totalRegistros} />
      <DetailItem 
        icon={<Hash className="text-amber-500"/>} 
        label="Status Geral" 
        value={<Badge className="bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-50">Processando</Badge>} 
      />
    </div>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: any }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
        <div className="text-lg font-semibold text-slate-800">{value ?? "-"}</div>
      </div>
    </div>
  )
}