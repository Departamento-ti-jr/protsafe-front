import { httpClient } from "../http-client"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"

export interface Abi {
  _id: string
  tipoTransacao: string
  sequencialTransacao: number
  dataRegistroTransacao: string
  horaRegistroTransacao: string
  identificadorANS: number
  registroANS: number
  versaoPadrao: number
  registroANS2: number
  razaoSocial: string
  CNPJ: number
  numeroOficio: number
  numeroProcesso: string
  numeroABI: string
  CNES: number
  nomeUPS: string
  naturezaUPS: string
  endereco: string
  municipio: string
  codigoUF: string
  cep: number
  competencia: number
  tipo: string
  numero: number
  dataInicioAtendimento: string
  dataFimAtendimento: string
  caraterAtendimento: number
  codigoBeneficiario: number
  codigoCCO: number
  dataNascBeneficiario: string
  nomeBeneficiario: string
  primeiraAlegacao: string
  segundaAlegacao: string
  clausulaPrimeiraAlegacao: string
  clausulaSegundaAlegacao: string
  declaracaoCPT: string
  grupoMunicipios: string
  cidades: string
  itemDLS: string
  valorTotal: number
  tipoProcedimento: string
  codigoProcedimento: number
  descricaoProcedimento: string
  quantidadeProcedimento: number
  valorProcedimento: number
  quantidadePrestador: number
  valorTotalPrestador: number
  quantidadeProcesso: number
  valorTotalProcesso: number
  hash: string
}

export interface CreateAbiData extends Abi {}

export interface GetAbisParams {
  page?: number
  limit?: number
  search?: string
  status?: string
}

export class AbisService {
  private static readonly endpoint = "/abis"

  static async getAll(params: GetAbisParams = {}): Promise<PaginatedResponse<Abi>> {
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
      if (params.status) {
        searchParams.append("status", params.status)
      }

      const url = searchParams.toString() ? `${this.endpoint}?${searchParams.toString()}` : this.endpoint

      return await httpClient.get<PaginatedResponse<Abi>>(url)
    } catch (error) {
      console.error("Erro ao buscar ABIs:", error)
      throw new Error("Falha ao carregar ABIs")
    }
  }

  static async getById(id: string): Promise<Abi> {
    try {
      return await httpClient.get<Abi>(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Erro ao buscar ABI com id ${id}:`, error)
      throw new Error("Falha ao carregar os detalhes da ABI")
    }
  }

  static async create(data: CreateAbiData): Promise<Abi> {
    try {
      return await httpClient.post<Abi>(this.endpoint, data)
    } catch (error) {
      console.error("Erro ao criar ABI:", error)
      throw new Error("Falha ao criar ABI")
    }
  }
}
