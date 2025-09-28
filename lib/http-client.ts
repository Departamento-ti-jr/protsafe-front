class HttpClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getAuthHeaders(isFormData = false): HeadersInit {
    const token = localStorage.getItem("resus_auth_token")
    // Só seta Content-Type se NÃO for FormData
    return {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async post<T>(
    endpoint: string,
    data?: any,
    responseType: "json" | "blob" = "json"
  ): Promise<T | Blob> {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getAuthHeaders(isFormData),
      body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      let errorBody: any = null;

      try {
        // tenta converter o corpo da resposta em texto
        const text = await response.text();
        errorBody = JSON.parse(text);
      } catch {
        // se não for JSON válido, mantém null
      }

      throw {
        status: response.status,
        statusText: response.statusText,
        body: errorBody,
      };
    }

    if (responseType === "blob") {
      return response.blob();
    }

    return response.json();
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

export const httpClient = new HttpClient("https://resus-api.codebeat.com.br")
