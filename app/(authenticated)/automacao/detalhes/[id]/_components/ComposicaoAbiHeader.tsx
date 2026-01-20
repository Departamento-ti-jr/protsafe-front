import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Props {
  numeroAbi?: number | string
  registroAns?: string
  operadoraNome?: string
}

export function ComposicaoAbiHeader({ numeroAbi, registroAns, operadoraNome }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6">
      <div className="flex items-center gap-4">
        <Link href="/automacao">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white shadow-sm border border-slate-200">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            ABI <span className="text-primary">{numeroAbi ?? "---"}</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Operadora</span>
            <Badge variant="outline" className="font-mono text-slate-600">{operadoraNome ?? "---"}</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
