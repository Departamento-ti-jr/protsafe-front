import { httpClient } from "../http-client"
import type { PaginatedResponse } from "@/components/ui/pagination-controls"

/** Dados básicos da operadora (join por registroAns ↔ ansRegister) */
export interface Operadora {
  id: number
  CNPJ: string
  name: string
  alias?: string
  type?: string
  email?: string
  phone?: string
  ansRegister: string
}

/**
 * Observações:
 * - Chaves com zeros à esquerda (cnpj/CNPJ, numeroABI, registroAns, numeroProcesso, numeroAihApac) como string.
 * - Campos “legados” ficaram opcionais.
 */
export interface Abi {
  _id: string

  // apenas para saber se o atendimento está defendido
  defenceId?: string

  // ===== Chaves / filtros principais =====
  cnpj?: string            // frontend pode usar minúsculo
  CNPJ?: string            // compatibilidade com dados antigos
  numeroABI?: string
  registroAns?: string
  numeroProcesso?: string
  numeroAihApac?: string
  codigoBeneficiario?: number
  comp?: string

  // ===== Campos CSV recentes =====
  pedido?: string
  requiredDocsCount?: number
  ordem?: number

  tipo?: string
  dataInicial?: string
  dataFinal?: string
  dataInicioAtendimento?: string
  dataFimAtendimento?: string

  descricaoPlanoDataAtendimento?: string
  registroAnsDataAtendimento?: string

  carencia?: number
  carenciaParto?: number
  preexistencia?: number
  abrangencia?: number

  abgNome?: string
  segmentacao?: string

  razaoSocial?: string
  nomeUPS?: string
  municipio?: string
  codigoUF?: string
  memoriaCalculo?: string

  // Status/origem definidos na importação
  status?: string
  tipoDoc: "RECURSO" | "IMPUGNACAO";

  // ===== Legados (opcionais) =====
  tipoTransacao?: string
  sequencialTransacao?: number
  dataRegistroTransacao?: string
  horaRegistroTransacao?: string
  identificadorANS?: number
  registroANS?: number
  versaoPadrao?: number
  registroANS2?: number
  numeroOficio?: number
  CNES?: number
  naturezaUPS?: string
  endereco?: string
  cep?: number
  competencia?: number
  numero?: number
  caraterAtendimento?: number
  codigoCCO?: number
  dataNascBeneficiario?: string
  nomeBeneficiario?: string
  primeiraAlegacao?: string
  segundaAlegacao?: string
  clausulaPrimeiraAlegacao?: string
  clausulaSegundaAlegacao?: string
  declaracaoCPT?: string
  grupoMunicipios?: string
  cidades?: string
  itemDLS?: string
  valorTotal: number
  tipoProcedimento?: string
  codigoProcedimento?: number
  descricaoProcedimento?: string
  quantidadeProcedimento?: number
  valorProcedimento?: number
  quantidadePrestador?: number
  valorTotalPrestador?: number
  quantidadeProcesso?: number
  valorTotalProcesso?: number

  // ===== Relações (via include) =====
  operadora?: Operadora
  operadoraName?: string
  operadoraCnpj?: string

  hash?: string
  createdAt?: string
  updatedAt?: string
}

export type CreateAbiData = Omit<Abi, "_id" | "createdAt" | "updatedAt">

export interface GetAbisParams {
  page?: number
  limit?: number
  id?: string
  cnpj?: string
  codigoBeneficiario?: number | string
  numeroABI?: string
  /** @deprecated use numeroABI */
  abi?: number | string
  /** não suportado no backend atual (ignorado) */
  search?: string
  /** não suportado no backend atual (ignorado) */
  status?: string
}

export class AbisService {
  private static readonly endpoint = "/abis"

  static async getAll(params: GetAbisParams = {}): Promise<PaginatedResponse<Abi>> {
    try {
      const searchParams = new URLSearchParams()

      if (params.page) searchParams.append("page", String(params.page))
      if (params.limit) searchParams.append("limit", String(params.limit))
      if (params.id) searchParams.append("id", params.id)
      if (params.cnpj) searchParams.append("cnpj", params.cnpj)

      if (params.codigoBeneficiario !== undefined && params.codigoBeneficiario !== null) {
        searchParams.append("codigoBeneficiario", String(params.codigoBeneficiario))
      }

      const numeroABI = params.numeroABI ?? (params.abi != null ? String(params.abi) : undefined)
      if (numeroABI) searchParams.append("numeroABI", numeroABI)

      const url = searchParams.toString() ? `${this.endpoint}?${searchParams.toString()}` : this.endpoint

      return await httpClient.get<PaginatedResponse<Abi>>(url)
    } catch (error) {
      console.error("Erro ao buscar ABIs:", error)
      throw new Error("Falha ao carregar ABIs")
    }
  }

  static async getAtendimentos(params?: { numeroABI?: string; page?: number; limit?: number }) {
    try {
      const searchParams = new URLSearchParams()

      if (params?.numeroABI) searchParams.append("numeroABI", params.numeroABI)
      if (params?.page) searchParams.append("page", String(params.page))
      if (params?.limit) searchParams.append("limit", String(params.limit))

      const url = searchParams.toString()
        ? `${this.endpoint}/atendimentos?${searchParams.toString()}`
        : `${this.endpoint}/atendimentos`

      return await httpClient.get<PaginatedResponse<Abi>>(url)
    } catch (error) {
      console.error("Erro ao buscar atendimentos:", error)
      throw new Error("Falha ao carregar atendimentos")
    }
  }

  static async markAsSemDefesa(id: string): Promise<Abi> {
    try {
      const url = `${this.endpoint}/${id}/sem-defesa`
      return await httpClient.put<Abi>(url)
    } catch (error) {
      console.error(`Erro ao marcar atendimento ${id} como sem defesa:`, error)
      throw new Error("Falha ao marcar atendimento como sem defesa")
    }
  }

  static async getById(
    id: string,
    options?: { include?: string[] }
  ): Promise<Abi> {
    try {
      let url = `${this.endpoint}/${id}`
      if (options?.include?.length) {
        const params = new URLSearchParams()
        params.append("include", options.include.join(","))
        url += `?${params.toString()}`
      }
      return await httpClient.get<Abi>(url)
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

  /** Upload de CSV conforme controller Nest: POST /abis/upload-csv?tipoDoc&upsert&batchSize */
  static async uploadCsv(
  file: File,
  opts?: { tipoDoc?: string; upsert?: boolean; batchSize?: number }
): Promise<any> {
  const form = new FormData()
  form.append("file", file)

  // ✅ enviar os campos dentro do FormData (não na URL)
  if (opts?.tipoDoc) form.append("tipoDoc", opts.tipoDoc)
  if (typeof opts?.upsert === "boolean") form.append("upsert", String(opts.upsert))
  if (opts?.batchSize) form.append("batchSize", String(opts.batchSize))

  const url = `${this.endpoint}/upload-csv`

  return await httpClient.post(url, form);
}


}
