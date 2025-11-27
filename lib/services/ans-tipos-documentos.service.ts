// src/lib/services/ans-tipos-documentos.service.ts
import { httpClient } from "../http-client"; // ajuste o caminho se necessário

export interface AnsTipoDocumento {
  id: number;
  id_ans: number;
  nome: string;
  criado_em?: string;
  atualizado_em?: string;
}

export class AnsTiposDocumentosService {
  private static readonly endpoint = "/ans-tipos-documentos";

  /** Lista todos os tipos */
  static async getAll(): Promise<AnsTipoDocumento[]> {
    // seu httpClient.get já retorna o JSON (não precisa desestruturar { data })
    return httpClient.get<AnsTipoDocumento[]>(this.endpoint);
  }

  /** Opção para popular selects no front */
  static async getSelectOptions(valueField: "mongo" | "ans" = "mongo") {
    const tipos = await this.getAll();
    return tipos.map(t => ({
      label: t.nome,
      value: valueField === "ans" ? String(t.id_ans) : t._id,
      meta: t, // útil se quiser ter o objeto inteiro à mão
    }));
  }
}
