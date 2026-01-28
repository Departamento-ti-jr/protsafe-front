import { httpClient } from "../http-client"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"

export interface ComposicaoDadosAbi {
  id: number
  numeroAbi: string
  registroAns: string
  numeroProcesso: string
  operadoraId: number | null
  operadoraNome: string
  operadoraCnpj: string
  createdAt: string
  updatedAt: string
  razaoSocial?: string
  status?: string
}

export interface ComposicaoDadosAbiRegistro {
  id: string
  numeroAbi: number
  ordem: string
  qtdDocumentos: number
  qtdDocumentosUpload: number
  registroAns: string
  pedidoDefesa: string
  numeroAihApac: string
  codigoPrimeiraAlegacao: string | null
  codigoSegundaAlegacao: string | null
  descricaoPrimeiraAlegacao: string | null
  descricaoSegundaAlegacao: string | null
  segundaAlegacao: string | null
  clausulaPrimeiraAlegacao: string | null
  clausulaSegundaAlegacao: string | null
  declaracaoCpt: string | null
  itemCpt: string | null
  grupoMunicipiosEstados: string | null
  cidadesEstados: string | null
  copart: string | null
  totalCopart: string | null
  memoriaDeCalculo: string | null
  valorAbatido: string | null
  dataInclusaoBeneficiario: string | null
  dataFimCarencia: string | null
  dataFimCpt: string | null
  dataInicial: string | null
  dataFinal: string | null
  tipoDefesa: string | null
  competencia: string | null
  s3PathDocPrincipal: string | null
  s3PathDocAdicional: any
  hash: string
  statusEnvio: number | null
  protocoloId?: string | null
  abiId: number
  workerError?: string | null
  operadoraNome?: string 
  razaoSocial?: string
}

export interface ComposicaoDadosRegistroDetalhe extends ComposicaoDadosAbiRegistro {
  descricaoPrimeiraAlegacao: string | null
  descricaoSegundaAlegacao: string | null
  totalCopart: string | null
  memoriaDeCalculo: string | null
  valorAbatido: string | null
  dataInclusaoBeneficiario: string | null
  dataFimCarencia: string | null
  dataFimCpt: string | null
}

export interface GetComposicaoDadosAbisParams {
  page?: number
  pageSize?: number
  search?: string
  status?: string
}

export class ComposicaoDadosAnsService {
  private static readonly endpoint = "/composicao-dados-ans/abis"
  private static readonly apiKeyHeader = { "x-api-key": "TcnnTvMrJBYTl4r8WXZbjRTtYzEo2D" }

  static async getAll(params: GetComposicaoDadosAbisParams = {}): Promise<PaginatedResponse<ComposicaoDadosAbi>> {
    try {
      const searchParams = new URLSearchParams()

      if (params.page) searchParams.append("page", String(params.page))
      if (params.pageSize) searchParams.append("pageSize", String(params.pageSize))
      if (params.search) searchParams.append("search", params.search)
      if (params.status) searchParams.append("status", params.status)

      const query = searchParams.toString()
      const url = query ? `${this.endpoint}?${query}` : this.endpoint

      return await httpClient.get<PaginatedResponse<ComposicaoDadosAbi>>(url, this.apiKeyHeader)
    } catch (error) {
      console.error("Erro ao buscar ABIs de composição de dados ANS:", error)
      throw new Error("Falha ao carregar ABIs de composição de dados ANS")
    }
  }

  static async getRegistrosByAbiId(
    abiId: string,
    params: {
      page?: number
      pageSize?: number
      numeroAihApac?: string
      status?: string
      order?: string
      tipo?: "IMPUGNACAO" | "RECURSO"
    } = {}
  ): Promise<PaginatedResponse<ComposicaoDadosAbiRegistro>> {
    try {
      const searchParams = new URLSearchParams()

      if (params.page) searchParams.append("page", String(params.page))
      if (params.pageSize) searchParams.append("pageSize", String(params.pageSize))
      if (params.numeroAihApac) searchParams.append("numeroAihApac", params.numeroAihApac)
      if (params.status) searchParams.append("status", params.status)
      if (params.order) searchParams.append("order", params.order)
      if (params.tipo) searchParams.append("tipo", params.tipo)

      const query = searchParams.toString()
      const url = query
        ? `/composicao-dados-ans/abi/${abiId}?${query}`
        : `/composicao-dados-ans/abi/${abiId}`

      return await httpClient.get<PaginatedResponse<ComposicaoDadosAbiRegistro>>(url, this.apiKeyHeader)
    } catch (error) {
      console.error(`Erro ao buscar registros da ABI ${abiId}:`, error)
      throw new Error("Falha ao carregar registros da ABI")
    }
  }

  static async getRegistroById(id: string): Promise<ComposicaoDadosRegistroDetalhe> {
    try {
      return await httpClient.get<ComposicaoDadosRegistroDetalhe>(`/composicao-dados-ans/registro/${id}`, this.apiKeyHeader)
    } catch (error) {
      console.error(`Erro ao buscar registro ${id}:`, error)
      throw new Error("Falha ao carregar registro")
    }
  }

  static async uploadAnexo(registroId: string, file: File) {
    try {
      const form = new FormData()
      form.append("file", file)

      // endpoint conforme exemplo de curl: /composicao-dados-ans/:id/upload-pdf
      return await httpClient.post(`/composicao-dados-ans/${registroId}/upload-pdf`, form, "json", this.apiKeyHeader)
    } catch (error) {
      console.error(`Erro ao anexar arquivo ao registro ${registroId}:`, error)
      throw new Error("Falha ao anexar arquivo")
    }
  }

  static async removeAnexo(registroId: string, anexoId: string) {
    try {
      return await httpClient.delete(`/composicao-dados-ans/${registroId}/remover-anexo/${anexoId}`, this.apiKeyHeader)
    } catch (error) {
      console.error(`Erro ao remover anexo ${anexoId} do registro ${registroId}:`, error)
      throw new Error("Falha ao remover anexo")
    }
  }

  static async processarLote(ids: Array<string | number>) {
    try {
      const numericIds = ids.map((id) => Number(id)).filter((n) => !Number.isNaN(n))
      return await httpClient.post(`/composicao-dados-ans/processar-lote`, { ids: numericIds }, "json", this.apiKeyHeader)
    } catch (error) {
      console.error("Erro ao processar lote de registros:", error)
      throw new Error("Falha ao enviar registros para a ANS")
    }
  }

  static async sincronizarDocumentos(numeroAbi: string | number, registroAns: string | number) {
    try {
      const searchParams = new URLSearchParams()
      searchParams.append("numeroAbi", String(numeroAbi))
      searchParams.append("registroAns", String(registroAns))
      return await httpClient.get(
        `/composicao-dados-ans/trigger-busca-documentos?${searchParams.toString()}`,
        this.apiKeyHeader
      )
    } catch (error) {
      console.error("Erro ao sincronizar documentos:", error)
      throw new Error("Falha ao sincronizar documentos")
    }
  }

  static async atualizarProtocolo(registroId: string, protocolo: string) {
    try {
      return await httpClient.patch(
        `/composicao-dados-ans/registro/${registroId}`,
        { protocolo_id: protocolo },
        this.apiKeyHeader
      )
    } catch (error) {
      console.error(`Erro ao atualizar protocolo do registro ${registroId}:`, error)
      throw new Error("Falha ao salvar protocolo")
    }
  }

  static async uploadCsv(file: File) {
    try {
      const form = new FormData()
      form.append("file", file)
      return await httpClient.post(`/composicao-dados-ans/upload-csv`, form, "json", this.apiKeyHeader)
    } catch (error) {
      console.error("Erro ao importar CSV de composição de dados ANS:", error)
      throw error
    }
  }
}
