import { PaginatedResponse } from "@/hooks/use-pagination"
import { httpClient } from "../http-client"
import { Abi, Operadora } from "./abis.service"
import type { Atendimento, AtendimentosService } from "./atendimentos.service"

export interface Defesa {
  /** MongoDB id legado */
  _id?: string
  /** Novo ID numérico */
  id?: number
  atendimentoId?: number
  petitionType?: "RECURSO" | "IMPUGNACAO"
  /** novo backend pode retornar tipoPeticao */
  tipoPeticao?: "RECURSO" | "IMPUGNACAO"
  text?: string
  /** novo backend pode retornar textoDefesa */
  textoDefesa?: string
  calculationMemory?: string
  /** novo backend pode retornar memoriaCalculo */
  memoriaCalculo?: string
  tempestividade?: string
  supportingDocuments?: {
    _id: string
    tipo: string
    createdAt: string
    updatedAt: string
    __v: number
  }[]
  othersSupportingDocument?: string
  supportingDocument?: string
  opcaoOrdem?: number
  defencesText?: {
    _id: string
    nome: string
  }[]
  atendimento?: Atendimento
  motivoIds?: number[]
  documentosComprobatoriosIds?: number[]
  createdAt?: string
  updatedAt?: string
  criadoEm?: string
  atualizadoEm?: string
  valorRetificacao?: string | null
  operadora?: Operadora
  numProtocoloAns?: string
  caminhoS3Pdf?: string | null
  s3PdfPath?: string
  statusDefesa?: string | null
  processadoEm?: string | null
  __v: number
}

export interface CreateDefesaPayload {
  atendimentoId: number
  tipoPeticao: "RECURSO" | "IMPUGNACAO"
  textoDefesa?: string
  tempestividade?: string
  memoriaCalculo?: string
  outrosDocumentosComplementares?: string
  opcaoOrdem?: number
  valorRetificacao?: string
  caminhoS3Pdf?: string
  statusDefesa?: string
  processadoEm?: string
  numProtocoloAns?: string
  criadoPor?: string
  atualizadoPor?: string
}

export type UpdateDefesaPayload = Partial<CreateDefesaPayload>

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
      return Promise.reject(error)
    }
  }

  static async getAllWithAtendimento(params: { page?: number; limit?: number } = {}): Promise<PaginatedResponse<Defesa>> {
    try {
      const searchParams = new URLSearchParams();
      if (params.page)  searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());

      const url = `${this.endpoint}/all?${searchParams.toString()}`;
      return await httpClient.get<PaginatedResponse<Defesa>>(url);
    } catch (error) {
      console.error("Erro ao buscar defesas com atendimento:", error);
      throw new Error("Falha ao carregar defesas com atendimento");
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

  static async create(data: CreateDefesaPayload): Promise<{ message: string; data: Defesa }> {
    return await httpClient.post<{ message: string; data: Defesa }>("/defesa", data);
  }

  static async generatePdf(id: string): Promise<Blob> {
    return await httpClient.post(`/defesa/${id}/pdf`, null, "blob");
  }


  static async update(id: number, data: UpdateDefesaPayload): Promise<Defesa> {
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
