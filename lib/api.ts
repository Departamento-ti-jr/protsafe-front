const API_BASE_URL = "https://resus-api.codebeat.com.br"

export interface TextoDefesa {
  _id: string
  id: string
  nome: string
  texto: string
  updatedAt?: string
}

export class ApiService {
  static async getTextosDefesa(): Promise<TextoDefesa[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/texto-defesa`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Erro ao buscar textos de defesa:", error)
      throw error
    }
  }

  // Método para buscar um texto de defesa específico
  static async getTextoDefesaById(id: string): Promise<TextoDefesa> {
    try {
      const response = await fetch(`${API_BASE_URL}/texto-defesa/${id}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`Erro ao buscar texto de defesa ${id}:`, error)
      throw error
    }
  }

  // Método para atualizar um texto de defesa
  static async updateTextoDefesa(id: string, textoDefesa: Partial<TextoDefesa>): Promise<TextoDefesa> {
    try {
      const response = await fetch(`${API_BASE_URL}/texto-defesa/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(textoDefesa),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`Erro ao atualizar texto de defesa ${id}:`, error)
      throw error
    }
  }
}
