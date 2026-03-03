"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Building2,
  ClipboardList,
  FileText,
  Hash,
  Layers,
  RefreshCcw,
} from "lucide-react"
import { DashboardService, type DashboardAbiMetrics } from "@/lib/services/dashboard.service"
import { LogsService, type AppLog } from "@/lib/services/logs.service"
import { formatDateTimeToDDMMYYYYHHMMSS } from "@/lib/date-helpers"

export default function DashboardPage() {
  const [data, setData] = useState<DashboardAbiMetrics | null>(null)
  const [logs, setLogs] = useState<AppLog[]>([])
  const [loading, setLoading] = useState(true)
  const [logsLoading, setLogsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [logsError, setLogsError] = useState<string | null>(null)

  const loadMetrics = async () => {
    setLoading(true)
    try {
      const response = await DashboardService.getAbiMetrics()
      setData(response)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Não foi possível carregar as métricas do dashboard.")
    } finally {
      setLoading(false)
    }
  }

  const loadLogs = async () => {
    setLogsLoading(true)
    try {
      const response = await LogsService.getAll({ limit: 4 })
      setLogs(response.logs ?? [])
      setLogsError(null)
    } catch (err) {
      console.error(err)
      setLogsError("Não foi possível carregar os logs.")
    } finally {
      setLogsLoading(false)
    }
  }

  useEffect(() => {
    loadMetrics()
    loadLogs()
  }, [])

  const currency = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h1>
          <p className="text-sm text-slate-500">Visão geral da ABI em processamento</p>
        </div>
        <Button variant="outline" onClick={() => { loadMetrics(); loadLogs() }} disabled={loading} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          {loading ? "Atualizando..." : "Atualizar"}
        </Button>
      </div>

      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Card key={idx} className="border-slate-200">
              <CardContent className="p-6">
                <div className="h-4 w-32 bg-slate-100 rounded mb-4" />
                <div className="h-8 w-24 bg-slate-100 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && error && (
        <Card className="border-red-100 bg-red-50">
          <CardContent className="p-6 text-red-600">{error}</CardContent>
        </Card>
      )}

      {!loading && data && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-[#0f766e] to-[#14b8a6] border-0 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm font-medium mb-1">ABI Atual</p>
                  <p className="text-2xl font-bold">{data.abiAtual}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Layers className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#2563eb] to-[#60a5fa] border-0 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Atendimentos da ABI</p>
                  <p className="text-2xl font-bold">{data.atendimentos_da_abi}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ClipboardList className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#059669] to-[#34d399] border-0 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Total Abatimentos</p>
                  <p className="text-xl font-bold">{currency.format(data.total_abatimentos || 0)}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#d97706] to-[#f59e0b] border-0 text-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Operadoras</p>
                  <p className="text-2xl font-bold">{data.operadoras_cadastradas_para_importacao}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Itens enviados com erro
                </CardTitle>
                <CardDescription>Retornos com falha no processamento</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-2xl font-bold text-slate-800">{data.itens_enviado_com_erro}</p>
                <Badge variant="warning">Atenção</Badge>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Hash className="h-4 w-4 text-slate-500" />
                  Protocolo não preenchido
                </CardTitle>
                <CardDescription>Registros sem protocolo</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-2xl font-bold text-slate-800">{data.protocolo_id_nao_preenchido}</p>
                <Badge variant="outline">Pendentes</Badge>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <FileText className="h-4 w-4 text-slate-500" />
                  Tipo de pedido mais frequente
                </CardTitle>
                <CardDescription>Ranking atualizado para a ABI atual</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base font-semibold text-slate-800">
                  {data.tipo_pedido_defesa_mais_frequente || "--"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <Card className="bg-white border-slate-200 shadow-modernize">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <div className="w-8 h-8 bg-[#0f766e]/10 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-[#0f766e]" />
            </div>
            Logs recentes
          </CardTitle>
          <CardDescription className="text-slate-600">Últimos registros do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
            {logsLoading && (
              <div className="text-sm text-slate-400">Carregando logs...</div>
            )}
            {!logsLoading && logsError && (
              <div className="text-sm text-red-600">{logsError}</div>
            )}
            {!logsLoading && !logsError && logs.length === 0 && (
              <div className="text-sm text-slate-400">Nenhum log encontrado.</div>
            )}
            {!logsLoading && !logsError && logs.map((log) => {
              const description = [log.action, log.message].filter(Boolean).join(" - ") || "-"
              const timestamp = formatDateTimeToDDMMYYYYHHMMSS(log.timestamp)
              return (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-2 h-2 bg-[#0f766e] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-800">{description}</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {log.userName ? `Usuário: ${log.userName} • ` : ""}
                      {timestamp || "--"}
                    </p>
                  </div>
                </div>
              )
            })}
            <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
              <a href="/logs">Ver todos os logs</a>
            </Button>
        </CardContent>
      </Card>
    </div>
  )
}
