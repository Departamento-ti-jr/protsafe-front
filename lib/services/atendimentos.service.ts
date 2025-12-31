import { httpClient } from "../http-client"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"
import { Abi } from "./abis.service"
import { Defesa } from "./defesas.service"

/** Dados básicos do ABI associado ao atendimento */
export interface AbiResumo {
  id: number
  numeroAbi?: string
  registroAns?: string
  numeroProcesso?: string
}

/** Entidade principal: Atendimento */
export interface Atendimento {
  id: number
  abiId: number

  tipoTransacao?: string
  numeroProcesso?: string
  competencia?: string
  municipio?: string
  tipo?: string
  tipoProcedimento?: string
  codigoProcedimento?: string | number
  quantidadeProcedimento?: number
  numeroAihApac?: string
  dataInicioAtendimento?: string
  dataFimAtendimento?: string
  valorTotal?: number
  descricao?: string
  descricaoProcedimento?: string
  dataRegistroTransacao?: string
  horaRegistroTransacao?: string
  quantidadeProcesso?: number
  // Relações
  abi?: Abi

  // Campos complementares
  observacao?: string
  documentos?: string
  numProtocolo?: string

  defesa?: Defesa
  semDefesa?: boolean

  // Timestamps
  criadoEm?: string
  atualizadoEm?: string
}

/** Parâmetros de busca com paginação e filtros */
export interface GetAtendimentosParams {
  page?: number
  limit?: number
  abiId?: number
  tipoTransacao?: string
  registroAns?: string
  numeroProcesso?: string
  municipio?: string
  competencia?: string
}

/** Serviço de integração com /atendimentos */
export class AtendimentosService {
  private static readonly endpoint = "/atendimentos"

    static async getById(
      id: string
    ): Promise<Atendimento> {
      try {
        let url = `${this.endpoint}/${id}`
        return await httpClient.get<Atendimento>(url)
      } catch (error) {
        console.error(`Erro ao buscar ABI com id ${id}:`, error)
        throw new Error("Falha ao carregar os detalhes da ABI")
      }
    }

    static async getProcedumentosByAtendimentoId(
      id: number
    ): Promise<Atendimento[]> {
      try {
        let url = `${this.endpoint}/${id}/procedimentos`
        return await httpClient.get<Atendimento[]>(url)
      } catch (error) {
        console.error(`Erro ao buscar ABI com id ${id}:`, error)
        throw new Error("Falha ao carregar os detalhes da ABI")
      }
    }

  /**
   * Busca paginada de atendimentos com filtros opcionais
   */
  static async getAll(
    params: GetAtendimentosParams = {}
  ): Promise<PaginatedResponse<Atendimento>> {
    try {
      const searchParams = new URLSearchParams()

      if (params.page) searchParams.append("page", String(params.page))
      if (params.limit) searchParams.append("limit", String(params.limit))
      if (params.abiId) searchParams.append("abiId", String(params.abiId))
      if (params.tipoTransacao) searchParams.append("tipoTransacao", params.tipoTransacao)
      if (params.numeroProcesso) searchParams.append("numeroProcesso", params.numeroProcesso)
      if (params.municipio) searchParams.append("municipio", params.municipio)
      if (params.competencia) searchParams.append("competencia", params.competencia)

      const url = searchParams.toString()
        ? `${this.endpoint}?${searchParams.toString()}`
        : this.endpoint

      return await httpClient.get<PaginatedResponse<Atendimento>>(url)
    } catch (error) {
      console.error("Erro ao buscar atendimentos:", error)
      throw new Error("Falha ao carregar atendimentos")
    }
  }

  static async updateCamposComplementares(
    id: string | number,
    body: { numProtocolo?: string; observacao?: string; documentos?: string }
  ): Promise<Atendimento> {
    try {
      const url = `${this.endpoint}/${id}/campos-complementares`
      return await httpClient.put<Atendimento>(url, body)
    } catch (error) {
      console.error(`Erro ao atualizar campos complementares do atendimento ${id}:`, error)
      throw new Error("Falha ao salvar campos complementares do atendimento")
    }
  }
}
