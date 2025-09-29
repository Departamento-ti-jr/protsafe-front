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

export interface UploadAnsDocumentoPayload {
  id_atendimento: string;
  tipo_documento: string;   // ObjectId
  id_protocolo: number;
  nome?: string;
}

export class AnsDocumentosService {
  private static readonly endpoint = "/ans-documentos";

  static async uploadDocument(
    file: File,
    payload: UploadAnsDocumentoPayload,
  ): Promise<any> {
    const formData = new FormData();
    formData.append("file", file); // nome do campo PRECISA ser "file"
    formData.append("id_atendimento", payload.id_atendimento);
    formData.append("tipo_documento", payload.tipo_documento);
    formData.append("id_protocolo", String(payload.id_protocolo));
    if (payload.nome) formData.append("nome", payload.nome);

    return await httpClient.post<{ url: string; caminho: string }>(
      `/ans-documentos/upload`,
      formData
    );
  }


  static async getDocumentosByDefesaId(id_defesa: string): Promise<any[]> {
    try {
      const response: any = await httpClient.get<any[]>(`${this.endpoint}/por-defesa/${id_defesa}`);
      return response?.data;
    } catch (error) {
      console.error("Erro ao buscar documentos por ID de defesa:", error);
      throw new Error("Falha ao carregar documentos");
    }
  } 

  static async getDocumentosByAtendimento(id_atendimento: string) {
    const data = await httpClient.get<{ protsafe: any[]; ans: any[] }>(
      `/ans-documentos/por-atendimento/${id_atendimento}`
    )
    return data
  }


  // static async getDocumentosByAtendimento(id_atendimento: string) {
  //   const { data } = await httpClient.get<{ protsafe: any[]; ans: any[] }>(
  //     `${this.endpoint}/por-atendimento/${id_atendimento}`
  //   );
  //   return data;
  // }

}
