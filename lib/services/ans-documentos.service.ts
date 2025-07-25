import { httpClient } from "../http-client";


export interface AnsDocumento {
  _id: string;
  id_defesa: string;
  tipo_documento: string;
  id_protocolo: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

export class AnsDocumentosService {
  private static readonly endpoint = "/ans-documentos";

  static async uploadDocument(
    file: File,
    id_defesa: string,
    tipo_documento: string,
    id_protocolo: string,
    token?: string // opcional, caso queira passar Authorization
  ): Promise<string> {
    try {
        console.log("Uploading document:", {
          fileName: file.name,
          id_defesa,
          tipo_documento,
          id_protocolo,
        });
    
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id_defesa", id_defesa);
      formData.append("tipo_documento", tipo_documento);
      formData.append("id_protocolo", id_protocolo);

      const response: any = await httpClient.post<{ url: string }>(
        `${this.endpoint}/upload`, formData
      );

      return response.data.url;
    } catch (error) {
      console.error("Erro ao fazer upload do documento:", error);
      throw new Error("Falha ao fazer upload do documento");
    }
  }

  static async getDocumentosByDefesaId(id_defesa: string): Promise<any[]> {
    try {
      id_defesa = '3224103278891';
      const response: any = await httpClient.get<any[]>(`${this.endpoint}/por-defesa/${id_defesa}`);
      return response?.data;
    } catch (error) {
      console.error("Erro ao buscar documentos por ID de defesa:", error);
      throw new Error("Falha ao carregar documentos");
    }
  } 

}
