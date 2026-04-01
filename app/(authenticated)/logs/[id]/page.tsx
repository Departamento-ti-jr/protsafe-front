"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { LogsService, type AppLog } from "@/lib/services/logs.service"
import { formatDateTimeToDDMMYYYYHHMMSS } from "@/lib/date-helpers"

export default function LogDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [log, setLog] = useState<AppLog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await LogsService.getById(id)
        setLog(response)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Não foi possível carregar o log.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const description = log ? [log.action, log.message].filter(Boolean).join(" - ") : ""
  const timestamp = log?.timestamp ? formatDateTimeToDDMMYYYYHHMMSS(log.timestamp) : ""
  const [date, time] = timestamp ? timestamp.split(" ") : ["-", "-"]

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
          <CardTitle>Log #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && <p className="text-sm text-gray-500">Carregando...</p>}
          {!loading && error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && !error && !log && <p className="text-sm text-gray-500">Log não encontrado.</p>}
          {!loading && !error && log && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Data</p>
                  <p>{date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Hora</p>
                  <p>{time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nível</p>
                  <p>{log.level || "-"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Usuário</p>
                  <p>{log.userName || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Descrição</p>
                <p className="mt-1">{description || "-"}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
