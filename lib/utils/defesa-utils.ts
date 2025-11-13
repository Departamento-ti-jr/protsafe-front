export interface DefesaPayload {
  petitionType: "RECURSO" | "IMPUGNACAO"
  text: string
  tempestividade: string
  calculationMemory: string
  supportingDocuments: string[]
  othersSupportingDocument: boolean
  supportingDocument: string
  opcaoOrdem: number
  valorRetificacao: string
  defencesText: string[]
  atendimento: string
}

/**
 * Mapeia os campos do formulário de defesa para o payload esperado pela API.
 * Essa função garante a consistência entre Nova e Editar Defesa.
 */
export function mapDefesaToPayload(
  abiId: string,
  {
    tipoDoc,
    text,
    tempestividade,
    calculationMemory,
    selectedComprobatorios,
    informarOutrosDocumentos,
    supportingDocument,
    selectedPedido,
    valorRetificacao,
    selectedMotivos,
  }: {
    tipoDoc: "RECURSO" | "IMPUGNACAO"
    text: string
    tempestividade: string
    calculationMemory: string
    selectedComprobatorios: string[]
    informarOutrosDocumentos: boolean
    supportingDocument: string
    selectedPedido: string
    valorRetificacao: string
    selectedMotivos: string[]
  }
): DefesaPayload {
  return {
    petitionType: tipoDoc,
    text,
    tempestividade,
    calculationMemory,
    supportingDocuments: selectedComprobatorios,
    othersSupportingDocument: informarOutrosDocumentos,
    supportingDocument,
    opcaoOrdem:
      selectedPedido === "retificacao"
        ? 2
        : selectedPedido === "anulacao-subsidiaria"
        ? 3
        : 1,
    valorRetificacao,
    defencesText: selectedMotivos,
    atendimento: abiId,
  }
}
