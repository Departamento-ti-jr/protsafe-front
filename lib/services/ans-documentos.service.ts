import { httpClient } from "../http-client";

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
}
