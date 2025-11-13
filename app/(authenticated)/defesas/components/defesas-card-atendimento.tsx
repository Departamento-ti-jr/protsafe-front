import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { formatDateToDDMMYYYY } from "@/lib/date-helpers"
import { Abi } from "@/lib/services/abis.service"
import { Atendimento } from "@/lib/services/atendimentos.service"
import { CalendarDays, Building2, FileBadge, ClipboardList, Tag, Info } from "lucide-react"

interface DefesasAtendimentoProps {
  atendimento?: Atendimento
}

export default function DefesaCardAtendimento({ atendimento }: DefesasAtendimentoProps) {
  const formatDate = (date: any) => formatDateToDDMMYYYY(date)

  const formatCompetencia = (comp?: string | null) => {
    if (!comp) return "—"
    const cleaned = comp.replace(/\D/g, "")
    if (cleaned.length === 6) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
    }
    return comp
  }

  return (
    <Card className="border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-[rgba(43,62,89,0.3)] backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-3">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Item icon={<Tag />} label="Atendimento" value={atendimento?.numeroAihApac} />
          <Item icon={<Building2 />} label="Operadora" value={atendimento?.abi?.operadora?.razaoSocial} />
          <Item icon={<FileBadge />} label="Registro ANS" value={atendimento?.abi?.operadora?.registroAns} />
          <Item icon={<ClipboardList />} label="Competência" value={formatCompetencia(atendimento?.competencia)} />
          <Item icon={<Info />} label="Tipo" value={atendimento?.tipo} />
          <Item icon={<CalendarDays />} label="Data Inicial" value={formatDate(atendimento?.dataInicioAtendimento)} />
          <Item icon={<CalendarDays />} label="Data Final" value={formatDate(atendimento?.dataFimAtendimento)} />
        </div>
      </CardContent>
    </Card>
  )
}

function Item({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value?: string | number | null
}) {
  return (
    <div className="flex flex-col p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50 bg-slate-50/40 dark:bg-slate-800/30 hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors duration-200">
      <Label className="flex items-center gap-1 text-[12px] font-medium text-slate-500 dark:text-slate-400 mb-0.5">
        {icon}
        {label}
      </Label>
      <p className="font-semibold text-sm text-slate-700 dark:text-slate-100 text-[12px] truncate">
        {value || "—"}
      </p>
    </div>
  )
}
