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

export class TextosDefesaService {
  private static readonly endpoint = "/texto-defesa"

  static async getAll(): Promise<TextoDefesa[]> {
    try {
      return await httpClient.get<TextoDefesa[]>(this.endpoint)
    } catch (error) {
      console.error("Erro ao buscar textos de defesa:", error)
      throw new Error("Falha ao carregar textos de defesa")
    }
  }

  static async getById(id: string): Promise<TextoDefesa> {
    try {
      return await httpClient.get<TextoDefesa>(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Erro ao buscar texto de defesa ${id}:`, error)
      throw new Error("Falha ao carregar texto de defesa")
    }
  }

  static async create(data: CreateTextoDefesaData): Promise<TextoDefesa> {
    try {
      return await httpClient.post<TextoDefesa>(this.endpoint, data)
    } catch (error) {
      console.error("Erro ao criar texto de defesa:", error)
      throw new Error("Falha ao criar texto de defesa")
    }
  }

  static async update(id: string, data: UpdateTextoDefesaData): Promise<TextoDefesa> {
    try {
      return await httpClient.put<TextoDefesa>(`${this.endpoint}/${id}`, data)
    } catch (error) {
      console.error(`Erro ao atualizar texto de defesa ${id}:`, error)
      throw new Error("Falha ao atualizar texto de defesa")
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await httpClient.delete<void>(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Erro ao deletar texto de defesa ${id}:`, error)
      throw new Error("Falha ao deletar texto de defesa")
    }
  }
}
