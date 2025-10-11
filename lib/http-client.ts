class HttpClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  /** Lê o token com segurança (evita ReferenceError em SSR) */
  private getToken(): string | null {
    try {
      if (typeof window === "undefined") return null
      return localStorage.getItem("resus_auth_token")
    } catch {
      return null
    }
  }

  /**
   * Monta headers de autenticação.
   * - Só define Content-Type quando NÃO for FormData (o navegador calcula o boundary).
   * - Sempre manda Accept: application/json (ok com FormData).
   */
  private getAuthHeaders(isFormData = false): HeadersInit {
    const token = this.getToken()
    const headers: Record<string, string> = {
      Accept: "application/json",
    }

    if (!isFormData) {
      headers["Content-Type"] = "application/json"
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    return headers
  }

  /** Faz o parse “seguro” do corpo de sucesso (pode ser vazio) */
  private async parseOkResponse<T>(response: Response, responseType: "json" | "blob"): Promise<T | Blob> {
    if (responseType === "blob") {
      return response.blob()
    }

    // Para JSON, pode vir vazio (201/204 ou handlers que não retornam body)
    const text = await response.text().catch(() => "")
    if (!text) return {} as T

    try {
      return JSON.parse(text) as T
    } catch {
      // Se o servidor mandou algo que não é JSON mas o chamador espera JSON,
      // devolvemos um objeto “bruto” informativo.
      return { raw: text } as unknown as T
    }
  }

  /** Monta um erro rico com body (JSON ou texto) */
  private async buildHttpError(response: Response) {
    const raw = await response.text().catch(() => "")
    let parsed: any = null
    try { parsed = raw ? JSON.parse(raw) : null } catch { /* mantém null */ }

    return {
      status: response.status,
      statusText: response.statusText,
      body: parsed ?? raw ?? null,
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getAuthHeaders(false),
    })

    if (!response.ok) {
      throw await this.buildHttpError(response)
    }

    // parse “seguro” de JSON (pode vir vazio)
    const text = await response.text().catch(() => "")
    return text ? (JSON.parse(text) as T) : ({} as T)
  }

  async post<T>(
    endpoint: string,
    data?: any,
    responseType: "json" | "blob" = "json"
  ): Promise<T | Blob> {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getAuthHeaders(isFormData),
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw await this.buildHttpError(response)
    }

    return this.parseOkResponse<T>(response, responseType)
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getAuthHeaders(false),
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw await this.buildHttpError(response)
    }

    const text = await response.text().catch(() => "")
    return text ? (JSON.parse(text) as T) : ({} as T)
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(false),
    })

    if (!response.ok) {
      throw await this.buildHttpError(response)
    }

    const text = await response.text().catch(() => "")
    return text ? (JSON.parse(text) as T) : ({} as T)
  }
}

export const httpClient = new HttpClient("http://localhost:8080")
