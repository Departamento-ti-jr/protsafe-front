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
  private getAuthHeaders(isFormData = false, extraHeaders?: HeadersInit): HeadersInit {
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

    return {
      ...headers,
      ...(extraHeaders as Record<string, string> | undefined),
    }
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

  private async send<T>(params: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    endpoint: string
    data?: any
    responseType?: "json" | "blob"
    headers?: HeadersInit
    retrying?: boolean
  }): Promise<T | Blob> {
    const { method, endpoint, data, responseType = "json", headers, retrying = false } = params
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers: this.getAuthHeaders(isFormData, headers),
      body:
        method === "GET" || method === "DELETE"
          ? undefined
          : isFormData
            ? data
            : data
              ? JSON.stringify(data)
              : undefined,
    })

    if (!response.ok) {
      const refreshed = await this.tryRefreshToken(response)
      if (refreshed && !retrying) {
        return this.send<T>({ ...params, retrying: true })
      }

      throw await this.buildHttpError(response)
    }

    return this.parseOkResponse<T>(response, responseType)
  }

  async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.send<T>({ method: "GET", endpoint, headers }) as Promise<T>
  }

  async post<T>(
    endpoint: string,
    data?: any,
    responseType: "json" | "blob" = "json",
    headers?: HeadersInit
  ): Promise<T | Blob> {
    return this.send<T>({ method: "POST", endpoint, data, responseType, headers })
  }

  async put<T>(endpoint: string, data?: any, headers?: HeadersInit): Promise<T> {
    return this.send<T>({ method: "PUT", endpoint, data, headers }) as Promise<T>
  }

  async patch<T>(endpoint: string, data?: any, headers?: HeadersInit): Promise<T> {
    return this.send<T>({ method: "PATCH", endpoint, data, headers }) as Promise<T>
  }

  async delete<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
    return this.send<T>({ method: "DELETE", endpoint, headers }) as Promise<T>
  }

  /**
   * Tenta renovar o token quando a API responder 401 por expiração/invalidade
   * e, se renovado, permite que o request seja refeito uma vez.
   */
  private async tryRefreshToken(response: Response): Promise<boolean> {
    if (response.status !== 401) return false

    const raw = await response.clone().text().catch(() => "")
    let parsed: any = null
    try { parsed = raw ? JSON.parse(raw) : null } catch { /* mantém null */ }

    const message = (parsed && typeof parsed === "object")
      ? parsed.message ?? parsed.mensagem ?? parsed.error
      : typeof parsed === "string"
        ? parsed
        : raw

    const normalized = (message || "").toLowerCase()
    const isTokenExpired =
      normalized.includes("token") &&
      (normalized.includes("expirado") || normalized.includes("inválido") || normalized.includes("invalido"))

    if (!isTokenExpired || typeof window === "undefined") {
      return false
    }

    try {
      const res = await fetch("/api/auth/token", { cache: "no-store" })
      if (!res.ok) return false

      const data = await res.json().catch(() => null)
      const newToken = data?.token

      if (!newToken) return false

      localStorage.setItem("resus_auth_token", newToken)
      return true
    } catch {
      return false
    }
  }
}

export const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080")
