import { httpClient } from "../http-client";


export interface AnsDocumentoUploadPlain {
  id: number;
  nomeAnexo: string;
  idProtocolo: number;
  tipoDocumentoId: number;
  defesaId: number | null;
  caminho: string;
  criadoEm: string;
  atualizadoEm: string;
  criadoPor?: string;
  atualizadoPor?: string;
}

export interface UploadAnsDocumentoPayload {
  id_atendimento: number;
  tipo_documento: number;
  id_protocolo: number;
  nome?: string;
}

export interface UploadAnsDocumentoResponse {
  url: string;
  caminho: string;
  created: AnsDocumentoUploadPlain;
}

export class AnsDocumentosService {
  private static readonly endpoint = "/ans-documentos";

  static async uploadDocument(
    file: File,
    payload: UploadAnsDocumentoPayload,
  ): Promise<UploadAnsDocumentoResponse> {
    const formData = new FormData();
    formData.append("file", file); // nome do campo PRECISA ser "file"
    formData.append("id_atendimento", String(payload.id_atendimento));
    formData.append("tipo_documento", String(payload.tipo_documento));
    formData.append("id_protocolo", String(payload.id_protocolo));
    if (payload.nome) formData.append("nome", payload.nome);

    return await httpClient.post<UploadAnsDocumentoResponse>(
      `/ans-documentos/upload`,
      formData
    );
  }

  static async deleteDocument(id: string): Promise<void> {
    try {
      await httpClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar documento ${id}:`, error);
      throw new Error("Falha ao deletar documento");
    }
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

  static async getDocumentosByAtendimento(atendimento_id: number) {
    const data = await httpClient.get<{ protsafe: any[]; ans: any[] }>(
      `/ans-documentos/por-atendimento/${atendimento_id}`
    )
    return data
  }

  static async enviarDocumentosParaAns(id_atendimento: number) {
    try {
      const data  = await httpClient.post<{ message: string; detalhes?: any }>(
        `${this.endpoint}/enviar/${id_atendimento}`
      );
      return data;
    } catch (error: any) {
      console.error("Erro ao enviar documentos para ANS:", error);
      throw new Error(
        error?.response?.data?.message ||
        "Falha ao enviar documentos para ANS."
      );
    }
  }


  // static async getDocumentosByAtendimento(id_atendimento: string) {
  //   const { data } = await httpClient.get<{ protsafe: any[]; ans: any[] }>(
  //     `${this.endpoint}/por-atendimento/${id_atendimento}`
  //   );
  //   return data;
  // }

}
