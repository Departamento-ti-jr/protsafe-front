export interface DefesaPayload {
  petitionType: "RECURSO" | "IMPUGNACAO"
  text: string
  tempestividade: string
  calculationMemory: string
  supportingDocuments: string[]
  othersSupportingDocument: boolean
  supportingDocument: string
  orderOption: number
  rectificationValue: string
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
    rectificationValue,
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
    rectificationValue: string
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
    orderOption:
      selectedPedido === "retificacao"
        ? 2
        : selectedPedido === "anulacao-subsidiaria"
        ? 3
        : 1,
    rectificationValue,
    defencesText: selectedMotivos,
    atendimento: abiId,
  }
}
