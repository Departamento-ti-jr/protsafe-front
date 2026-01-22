import { httpClient } from "../http-client"

export interface AppLog {
  id: string
  timestamp: string
  level: string
  action?: string
  entityType?: string
  entityId?: string
  message?: string
  userName?: string
}

export interface LogsResponse {
  logs: AppLog[]
  total?: number
  page?: number
  limit?: number
  totalPages?: number
}

export interface GetLogsParams {
  level?: string
  id?: string
  page?: number
  limit?: number
}

export class LogsService {
  private static readonly endpoint = "/app-logs"

  static async getAll(params: GetLogsParams = {}): Promise<LogsResponse> {
    try {
      const searchParams = new URLSearchParams()

      if (params.level) searchParams.append("level", params.level)
      if (params.id) searchParams.append("id", params.id)
      if (params.page) searchParams.append("page", String(params.page))
      if (params.limit) searchParams.append("limit", String(params.limit))

      const url = searchParams.toString()
        ? `${this.endpoint}?${searchParams.toString()}`
        : this.endpoint

      return await httpClient.get<LogsResponse>(url)
    } catch (error) {
      console.error("Erro ao buscar logs:", error)
      throw new Error("Falha ao carregar logs")
    }
  }

  static async getById(id: string): Promise<AppLog> {
    try {
      const response = await this.getAll({ id })
      const log = response.logs?.[0]
      if (!log) {
        throw new Error("Log não encontrado")
      }
      return log
    } catch (error) {
      console.error(`Erro ao buscar log ${id}:`, error)
      throw new Error("Falha ao carregar log")
    }
  }
}
