import { httpClient } from "../http-client"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"

export interface DocumentoComprobatorio {
  _id: string
  tipo: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CreateDocumentoComprobatorioData extends Omit<DocumentoComprobatorio, "_id" | "createdAt" | "updatedAt" | "__v"> {}

export interface GetDocumentosParams {
  page?: number
  limit?: number
  search?: string
}

export class DocumentosComprobatoriosService {
  private static readonly endpoint = "/documentos-comprobatorios"

  static async getAll(params: GetDocumentosParams = {}): Promise<PaginatedResponse<DocumentoComprobatorio>> {
    try {
      const searchParams = new URLSearchParams()

      if (params.page) {
        searchParams.append("page", params.page.toString())
      }
      if (params.limit) {
        searchParams.append("limit", params.limit.toString())
      }
      if (params.search) {
        searchParams.append("search", params.search)
      }

      const url = searchParams.toString()
        ? `${this.endpoint}?${searchParams.toString()}`
        : this.endpoint

      return await httpClient.get<PaginatedResponse<DocumentoComprobatorio>>(url)
    } catch (error) {
      console.error("Erro ao buscar Documentos Comprobatórios:", error)
      throw new Error("Falha ao carregar os Documentos Comprobatórios")
    }
  }

  static async getById(id: string): Promise<DocumentoComprobatorio> {
    try {
      return await httpClient.get<DocumentoComprobatorio>(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Erro ao buscar Documento Comprobatório com id ${id}:`, error)
      throw new Error("Falha ao carregar os detalhes do Documento Comprobatório")
    }
  }

  static async create(data: CreateDocumentoComprobatorioData): Promise<DocumentoComprobatorio> {
    try {
      return await httpClient.post<DocumentoComprobatorio>(this.endpoint, data)
    } catch (error) {
      console.error("Erro ao criar Documento Comprobatório:", error)
      throw new Error("Falha ao criar Documento Comprobatório")
    }
  }

  static async update(id: string, data: Partial<CreateDocumentoComprobatorioData>): Promise<DocumentoComprobatorio> {
    try {
      return await httpClient.put<DocumentoComprobatorio>(`${this.endpoint}/${id}`, data)
    } catch (error) {
      console.error(`Erro ao atualizar Documento Comprobatório com id ${id}:`, error)
      throw new Error("Falha ao atualizar Documento Comprobatório")
    }
  }
}
