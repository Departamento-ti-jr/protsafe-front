import { PaginatedResponse } from "@/hooks/use-pagination"
import { httpClient } from "../http-client"
import { Abi } from "./abis.service"

export interface Defesa {
  _id: string
  petitionType: "RECURSO" | "IMPUGNACAO"
  text: string
  calculationMemory: string
  tempestividade?: string
  supportingDocuments: {
    _id: string
    tipo: string
    createdAt: string
    updatedAt: string
    __v: number
  }[]
  othersSupportingDocument: boolean
  supportingDocument: string
  orderOption: number
  rectificationValue: string
  defencesText: {
    _id: string
    nome: string
  }[]
  atendimento: Abi[],
  createdAt: string
  updatedAt: string
  __v: number
}

export class DefesasService {
  private static readonly endpoint = "/defesa"

  static async getAll(params: any): Promise<PaginatedResponse<Defesa>> {
    try {
      const searchParams = new URLSearchParams()
      if (params.page) {
        searchParams.append("page", params.page.toString())
      }
      if (params.limit) {
        searchParams.append("limit", params.limit.toString())
      }

      const url = `${this.endpoint}?${searchParams.toString()}`
      return await httpClient.get<PaginatedResponse<Defesa>>(url)
    } catch (error) {
      console.error("Erro ao buscar defesas:", error)
      throw new Error("Falha ao carregar defesas")
    }
  }

  static async findOneWithDocuments(id: string): Promise<Defesa> {
    try {
      return await httpClient.get<Defesa>(`${this.endpoint}/${id}/with-documents`)
    } catch (error) {
      console.error(`Erro ao buscar defesa ${id} com documentos:`, error)
      throw new Error("Falha ao carregar defesa com documentos")
    }
  }

  static async getById(id: string): Promise<Defesa> {
    try {
      return await httpClient.get<Defesa>(`${this.endpoint}?id=${id}`)
    } catch (error) {
      console.error(`Erro ao buscar defesa ${id}:`, error)
      throw new Error("Falha ao carregar defesa")
    }
  }

  static async create(data: Partial<Defesa>): Promise<Blob> {
    return await httpClient.post("/defesa", data, "blob");
  }

  static async update(id: string, data: Partial<Defesa>): Promise<Defesa> {
    try {
      return await httpClient.put<Defesa>(`${this.endpoint}/${id}`, data)
    } catch (error) {
      console.error(`Erro ao atualizar defesa ${id}:`, error)
      throw new Error("Falha ao atualizar defesa")
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await httpClient.delete<void>(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Erro ao deletar defesa ${id}:`, error)
      throw new Error("Falha ao deletar defesa")
    }
  }
}
