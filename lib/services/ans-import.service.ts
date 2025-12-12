import { httpClient } from "@/lib/http-client"

export interface AnsImportCsvResponse {
  inseridos?: number
  ignorados?: number
  erros?: string[]
  duplicadosBanco?: any[]
  duplicadosCsv?: any[]
  message?: string
}

export class AnsImportService {
  private static readonly endpoint = "/ans/upload-csv"

  static async uploadCsv(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    return httpClient.post<AnsImportCsvResponse>(this.endpoint, formData)
  }
}
