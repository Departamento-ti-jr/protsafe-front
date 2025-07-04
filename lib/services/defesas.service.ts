import { httpClient } from "../http-client"

export interface Defesa {
  _id: string
  id: string
  abi: string
  numeroOficio: string
  nomeOperadora: string
  cnpj: string
  numeroOrder: string
  atendimento: string
  data: string
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateDefesaData {
  abi: string
  numeroOficio: string
  nomeOperadora: string
  cnpj: string
  numeroOrder: string
  atendimento: string
  data: string
}

export interface UpdateDefesaData {
  abi?: string
  numeroOficio?: string
  nomeOperadora?: string
  cnpj?: string
  numeroOrder?: string
  atendimento?: string
  data?: string
  status?: string
}

export class DefesasService {
  private static readonly endpoint = "/defesas"

  static async getAll(): Promise<Defesa[]> {
    try {
      return await httpClient.get<Defesa[]>(this.endpoint)
    } catch (error) {
      console.error("Erro ao buscar defesas:", error)
      throw new Error("Falha ao carregar defesas")
    }
  }

  static async getById(id: string): Promise<Defesa> {
    try {
      return await httpClient.get<Defesa>(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Erro ao buscar defesa ${id}:`, error)
      throw new Error("Falha ao carregar defesa")
    }
  }

  static async create(data: CreateDefesaData): Promise<Defesa> {
    try {
      return await httpClient.post<Defesa>(this.endpoint, data)
    } catch (error) {
      console.error("Erro ao criar defesa:", error)
      throw new Error("Falha ao criar defesa")
    }
  }

  static async update(id: string, data: UpdateDefesaData): Promise<Defesa> {
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
