"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PaginationControls } from "@/components/ui/pagination-controls"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { useLogsList } from "./hooks/use-logs-list"
import { formatDateTimeToDDMMYYYYHHMMSS } from "@/lib/date-helpers"

export default function LogsPage() {
  const {
    data,
    loading,
    error,
    filters,
    handleLevelChange,
    handleIdChange,
    handlePageChange,
    handlePageSizeChange,
    refetch,
  } = useLogsList()

  const levelOptions = useMemo(
    () => ["INFO", "WARN", "ERROR", "DEBUG", "todos"],
    []
  )

  const resolveLevelVariant = (level?: string) => {
    const normalized = (level || "").toUpperCase()
    if (normalized === "ERROR") return "destructive"
    if (normalized === "WARN") return "warning"
    if (normalized === "INFO") return "secondary"
    if (normalized === "DEBUG") return "outline"
    return "default"
  }

  const getDateTimeParts = (timestamp?: string) => {
    const formatted = formatDateTimeToDDMMYYYYHHMMSS(timestamp)
    if (!formatted) return { date: "-", time: "-" }
    const [date, time] = formatted.split(" ")
    return { date: date || "-", time: time || "-" }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Logs</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="w-full sm:w-48">
            <Input
              value={filters.id}
              onChange={(e) => handleIdChange(e.target.value)}
              placeholder="Filtrar por ID"
              className="bg-white"
              disabled={loading}
            />
          </div>
          <div className="w-full sm:w-56">
            <Select value={filters.level} onValueChange={handleLevelChange} disabled={loading}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                {levelOptions.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "todos" ? "Todos" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline" onClick={refetch} disabled={loading} className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          {loading ? "Atualizando..." : "Atualizar"}
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-900">ID</TableHead>
              <TableHead className="font-medium text-gray-900">Data</TableHead>
              <TableHead className="font-medium text-gray-900">Hora</TableHead>
              <TableHead className="font-medium text-gray-900">Nível</TableHead>
              <TableHead className="font-medium text-gray-900">Descrição</TableHead>
              <TableHead className="font-medium text-gray-900 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  Carregando logs...
                </TableCell>
              </TableRow>
            )}
            {!loading && error && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-red-500 py-8">
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && data.logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  Nenhum log encontrado.
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              !error &&
              data.logs.map((log) => {
                const { date, time } = getDateTimeParts(log.timestamp)
                const description = [log.action, log.message].filter(Boolean).join(" - ") || "-"
                return (
                  <TableRow key={log.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{log.id}</TableCell>
                    <TableCell className="text-gray-600">{date}</TableCell>
                    <TableCell className="text-gray-600">{time}</TableCell>
                    <TableCell className="text-gray-600">
                      <Badge variant={resolveLevelVariant(log.level)}>{log.level || "-"}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex flex-col gap-1">
                        <span>{description}</span>
                        <span className="text-xs text-gray-500">
                          {log.userName ? `Usuário: ${log.userName}` : "Usuário: -"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/logs/${log.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={data.page}
        totalPages={data.totalPages}
        totalItems={data.total}
        pageSize={data.limit}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        disabled={loading}
      />
    </div>
  )
}
