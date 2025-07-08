import { httpClient } from "../http-client"

export interface TextoDefesa {
  _id: string
  id: string
  nome: string
  texto: string
  updatedAt?: string
  createdAt?: string
}

export interface CreateTextoDefesaData {
  nome: string
  texto: string
}

export interface UpdateTextoDefesaData {
  nome?: string
  texto?: string
}

export interface GetTextosDefesaParams {
  page?: number
  limit?: number
  search?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export class TextosDefesaService {
  private static readonly endpoint = "/texto-defesa"

  static async getAll(params: GetTextosDefesaParams = {}): Promise<PaginatedResponse<TextoDefesa>> {
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

      const url = searchParams.toString() ? `${this.endpoint}?${searchParams.toString()}` : this.endpoint

      return await httpClient.get<PaginatedResponse<TextoDefesa>>(url)
    } catch (error) {
      console.error("Erro ao buscar textos de defesa:", error)
      throw new Error("Falha ao carregar textos de defesa")
    }
  }

  static async getById(id: string): Promise<TextoDefesa> {
    try {
      console.log(`Buscando texto de defesa com ID: ${id}`)
      const result = await httpClient.get<TextoDefesa>(`${this.endpoint}/${id}`)
      console.log("Resultado da busca:", result)
      return result
    } catch (error) {
      console.error(`Erro ao buscar texto de defesa ${id}:`, error)
      throw new Error("Falha ao carregar texto de defesa")
    }
  }

  static async create(data: CreateTextoDefesaData): Promise<TextoDefesa> {
    try {
      console.log("Criando texto de defesa:", data)
      const result = await httpClient.post<TextoDefesa>(this.endpoint, data)
      console.log("Texto de defesa criado:", result)
      return result
    } catch (error) {
      console.error("Erro ao criar texto de defesa:", error)
      throw new Error("Falha ao criar texto de defesa")
    }
  }

  static async update(id: string, data: UpdateTextoDefesaData): Promise<TextoDefesa> {
    try {
      console.log(`Atualizando texto de defesa ${id}:`, data)
      const result = await httpClient.put<TextoDefesa>(`${this.endpoint}/${id}`, data)
      console.log("Texto de defesa atualizado:", result)
      return result
    } catch (error) {
      console.error(`Erro ao atualizar texto de defesa ${id}:`, error)
      throw new Error("Falha ao atualizar texto de defesa")
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      console.log(`Deletando texto de defesa ${id}`)
      await httpClient.delete<void>(`${this.endpoint}/${id}`)
      console.log("Texto de defesa deletado com sucesso")
    } catch (error) {
      console.error(`Erro ao deletar texto de defesa ${id}:`, error)
      throw new Error("Falha ao deletar texto de defesa")
    }
  }
}
