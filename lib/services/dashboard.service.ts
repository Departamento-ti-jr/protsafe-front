import { httpClient } from "../http-client"

export interface DashboardAbiMetrics {
  abiAtual: number
  operadoras_cadastradas_para_importacao: number
  itens_enviado_com_erro: number
  protocolo_id_nao_preenchido: number
  tipo_pedido_defesa_mais_frequente: string
  atendimentos_da_abi: number
  total_abatimentos: number
}

export class DashboardService {
  private static readonly endpoint = "/dashboard/abi-metrics"

  static async getAbiMetrics(): Promise<DashboardAbiMetrics> {
    try {
      return await httpClient.get<DashboardAbiMetrics>(this.endpoint)
    } catch (error) {
      console.error("Erro ao buscar métricas do dashboard:", error)
      throw new Error("Falha ao carregar métricas do dashboard")
    }
  }
}
