import { useToast } from "@/hooks/use-toast"
import { AnsDocumentosService } from "@/lib/services/ans-documentos.service"
import { useMutation, useQuery } from "@tanstack/react-query"

export interface UploadedDocument {
  id?: string | number
  name: string
  size: number | null
  type: string
  url: string
  caminho: string
}

/**
 * Hook responsável por carregar e anexar documentos relacionados a um atendimento.
 * - Faz upload de novos documentos
 * - Lista documentos existentes via AnsDocumentosService
 * - Controla estados de carregamento e erro via React Query
 */
export function useDocumentosAns(
  atendimentoId: number | undefined,
  setAnexedDocuments: React.Dispatch<React.SetStateAction<UploadedDocument[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const { toast } = useToast()

  // 🔹 Busca documentos já salvos
  const { refetch: refetchDocumentos } = useQuery({
    queryKey: ["documentos-ans", atendimentoId],
    enabled: false,
    queryFn: async () => {
      console.log("Carregando documentos salvos para atendimento:", atendimentoId)
      if (!atendimentoId) throw new Error("Atendimento não encontrado.")
      console.log("atendimentoId:", atendimentoId)
      const { protsafe } = await AnsDocumentosService.getDocumentosByAtendimento(atendimentoId)
      console.log("Documentos salvos carregados:", protsafe)
      const mapped = protsafe.map((doc: any) => ({
        id: doc.id,
        name: doc.nome ?? doc.nomeAnexo,
        size: null,
        type: doc.tipo_documento?.descricao || doc.tipoDocumento?.descricao || "Documento",
        url: doc.caminho?.startsWith("http")
          ? doc.caminho
          : `${process.env.NEXT_PUBLIC_AWS_BASE_URL}/${doc.caminho}`,
        caminho: doc.caminho,
      }))
      setAnexedDocuments(mapped)
      return mapped
    },
    onError: (err: any) => {
      console.error("Erro ao carregar documentos salvos:", err)
      setError("Falha ao carregar documentos salvos.")
      toast({
        variant: "destructive",
        title: "Erro ao carregar documentos",
        description: err?.message || "Falha ao carregar documentos salvos.",
      })
    },
  })

  // 🔹 Upload de novos documentos
  const uploadMutation = useMutation({
    mutationFn: async ({ files, tipoDocumentoId }: { files: { file: File }[]; tipoDocumentoId: number }) => {
      if (!atendimentoId) throw new Error("Atendimento não carregado.")

      const id_atendimento = atendimentoId
      const id_protocolo = 0
      const tipo_documento = tipoDocumentoId

      console.log("Iniciando upload de documentos para atendimento:", id_atendimento)

      const uploadedDocs: UploadedDocument[] = await Promise.all(
        files.map(async (fileData) => {
          const file = fileData.file
          if (!file) throw new Error("Arquivo inválido")
          if (!file.type?.toLowerCase().includes("pdf")) {
            throw new Error("Apenas arquivos PDF são permitidos.")
          }

          console.log("Iniciando upload do arquivo:", file)

          const { url, caminho, created } = await AnsDocumentosService.uploadDocument(file, {
            id_atendimento,
            tipo_documento,
            id_protocolo,
            nome: file.name,
          })

          const caminhoFinal = created?.caminho || caminho || url
          const resolvedUrl =
            caminhoFinal && caminhoFinal.startsWith("http")
              ? caminhoFinal
              : caminhoFinal
              ? `${process.env.NEXT_PUBLIC_AWS_BASE_URL}/${caminhoFinal}`
              : url

          return {
            id: created?.id,
            name: created?.nomeAnexo || file.name,
            size: file.size,
            type: String(tipo_documento),
            url: resolvedUrl,
            caminho: resolvedUrl,
          }
        })
      )
      
      return uploadedDocs
    },
    onSuccess: (uploadedDocs) => {
      setAnexedDocuments((prev) => [...prev, ...uploadedDocs])
      toast({
        title: "Documento(s) anexado(s)",
        description: `${uploadedDocs.length} arquivo(s) enviado(s) com sucesso.`,
      })
    },
    onError: (error: any) => {
      console.error("Erro ao enviar documento(s):", error)
      setError(error.message || "Erro ao enviar documento(s). Tente novamente.")
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Falha ao anexar documento(s).",
      })
    },
  })

  return {
    loadDocumentosSalvos: (id?: number) => {
      if (id) {
        atendimentoId = id
      }
      return refetchDocumentos()
    },
    handleAnexarDocumento: (files: { file: File }[], tipoDocumentoId: number) =>
      uploadMutation.mutate({ files, tipoDocumentoId }),
    isLoading: uploadMutation.isPending,
    isSuccess: uploadMutation.isSuccess,
    error: uploadMutation.error,
  }
}
