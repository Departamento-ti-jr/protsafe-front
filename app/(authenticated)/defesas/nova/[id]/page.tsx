"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnexarDocumentoDefesaModal } from "@/components/anexar-documento-defesa-modal"
import { TextoDefesa, TextosDefesaService } from "@/lib/services/textos-defesa.service"
import { DocumentoComprobatorio, DocumentosComprobatoriosService } from "@/lib/services/documentos-comprobatorios.service"
import { AnsDocumentosService } from "@/lib/services/ans-documentos.service"
import { DefesasService } from "@/lib/services/defesas.service"
import DefesaCardAtendimento from "../../components/defesas-card-atendimento"
import { Abi, AbisService } from "@/lib/services/abis.service"
import {
  CardFormularioImputacao,
  CardPedidos,
  CardDocumentosAnexados,
  CardDocumentosAns,
} from "../../components/defesa-cards/defesa-cards"
import { useToast } from "@/hooks/use-toast"
import RichTextEditor, { RichTextEditorHandle } from "@/components/rich-text-editor"
import { useDocumentosAns } from "@/hooks/use-anexar-documento"
import { DefesaAcoes } from "../../components/defesa-acoes"

export default function NovaDefesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const router = useRouter()
  const { toast } = useToast()

  const [tipoDoc, setTipoDoc] = useState<"RECURSO" | "IMPUGNACAO">("RECURSO")
  const [selectedPedido, setSelectedPedido] = useState("anulacao-identificacao")
  const [tempestividade, setTempestividade] = useState("")
  const [informarOutrosDocumentos, setInformarOutrosDocumentos] = useState(false)
  const [loadSalvarDefesa, setLoadSalvarDefesa] = useState<"salvando" | "gerando-pdf" | null>(null)
  const [abi, setAbi] = useState<Abi>()
  const [isAnexarModalOpen, setIsAnexarModalOpen] = useState(false)
  const [anexedDocuments, setAnexedDocuments] = useState<any[]>([])
  const [selectedMotivos, setSelectedMotivos] = useState<string[]>([])
  const [text, setText] = useState<string>("")
  const [selectedComprobatorios, setSelectedComprobatorios] = useState<string[]>([])
  const [textosDefesa, setTextosDefesa] = useState<TextoDefesa[]>([])
  const [documentosComprobatorios, setDocumentosComprobatorios] = useState<DocumentoComprobatorio[]>([])
  const [detalhamentoMotivo, setDetalhamentoMotivo] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [calculationMemory, setCalculationMemory] = useState("")
  const [supportingDocument, setSupportingDocument] = useState("")
  const [rectificationValue, setRectificationValue] = useState("")
  const editorRef = useRef<RichTextEditorHandle>(null)
  const [valorAbatido, setValorAbatido] = useState("")
  const [othersSupportingDocument, setOthersSupportingDocument] = useState("")
  const [hasUserChangedMotivos, setHasUserChangedMotivos] = useState(false)
  const [isLoadingAbi, setIsLoadingAbi] = useState(true)


  const { loadDocumentosSalvos, handleAnexarDocumento, isLoading } = useDocumentosAns(
    abi,
    setAnexedDocuments,
    setError
  )

  useEffect(() => {
    loadAtendimento()
    loadTextosDefesa()
    loadDocumentosComprobatorios()
  }, [])

  useEffect(() => {
    const textosConcatenados = textosDefesa
      .filter(t => selectedMotivos.includes(t._id))
      .map(t => t.texto)
      .join("\n\n")
    setText(textosConcatenados)
  }, [selectedMotivos, textosDefesa])

  useEffect(() => {
    if (abi?.memoriaCalculo) setCalculationMemory(abi.memoriaCalculo)
    if (abi?._id) loadDocumentosSalvos(abi._id)
  }, [abi])

  const loadAtendimento = async () => {
    try {
      console.log("Carregando atendimento (ABI)...")
      setIsLoadingAbi(true)
      const id = await params.then(p => p.id)
      const data = await AbisService.getById(id, { include: ["operadora"] })

      setAbi(data)
      setError(null)
    } catch (err: any) {
      console.error("Erro ao carregar ABI:", err)

      if (err?.status === 404 || err?.body?.statusCode === 404) {
        setError("Atendimento (ABI) não encontrado.")
      } else {
        console.log(err);
        setError("Erro ao carregar atendimento. Tente novamente.")
      }

      setAbi(undefined)
    } finally {
      setIsLoadingAbi(false)
    }
  }

  const loadTextosDefesa = async () => {
    try {
      const data = await TextosDefesaService.getAll({ limit: 100000 })
      setTextosDefesa(data.data)
    } catch (err) {
      setError("Erro ao carregar textos de defesa. Tente novamente.")
      console.error(err)
    }
  }

  const loadDocumentosComprobatorios = async () => {
    try {
      const data = await DocumentosComprobatoriosService.getAll({ limit: 100000 })
      setDocumentosComprobatorios(data.data)
    } catch (err) {
      setError("Erro ao carregar documentos comprobatórios. Tente novamente.")
      console.error(err)
    }
  }

  const handleEnviarParaAns = async () => {
    if (!abi?.numeroABI) {
      toast({
        variant: "warning",
        title: "Aviso",
        description: "Número da ABI não encontrado.",
      })
      return
    }

    try {
      toast({
        title: "Enviando...",
        description: `Enviando documentos da ABI ${abi.numeroABI} para a ANS...`,
      })

      const result = await AnsDocumentosService.enviarDocumentosParaAns(abi._id)

      toast({
        title: "Sucesso!",
        description: result?.message || "Documentos enviados com sucesso à ANS.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error?.message || "Falha ao enviar documentos para a ANS.",
      })
    }
  }

  const handleSalvarDefesa = async () => {
    try {
      setLoadSalvarDefesa("salvando")

      if (!abi?._id) {
        toast({
          variant: "warning",
          title: "Aviso",
          description: "Atendimento não encontrado.",
        })
        setLoadSalvarDefesa(null)
        return
      }

      const payload = mapDefesaToPayload(abi._id)
      console.log("Payload para salvar defesa:", payload)

      // 1️⃣ Cria a defesa no banco
      const response = await DefesasService.create(payload)
      const defesaId = response?.data?._id || response?._id

      if (!defesaId) throw new Error("ID da defesa não retornado pela API.")

      // 2️⃣ Gera o PDF
      setLoadSalvarDefesa("gerando-pdf")

      toast({
        title: "Gerando PDF...",
        description: "Por favor, aguarde enquanto o documento é criado.",
      })

      const pdfBlob = await DefesasService.generatePdf(defesaId)

      // 3️⃣ Abre o PDF em nova aba
      const url = URL.createObjectURL(pdfBlob)
      window.open(url, "_blank")

      toast({
        title: "Sucesso!",
        description: "Defesa criada e PDF gerado com sucesso.",
      })

      router.push(`/defesas/editar/${defesaId}`)
    } catch (error: any) {
      console.error("Erro ao salvar defesa:", error)

      const apiMessage =
        error?.body?.message ||
        error?.statusText ||
        "Erro ao salvar defesa."

      toast({
        variant: "warning",
        title: "Aviso",
        description: apiMessage,
      })

      setError(apiMessage)
    } finally {
      setLoadSalvarDefesa(null)
    }
  }

  function mapDefesaToPayload(abiId: string): any {
    return {
      petitionType: tipoDoc,
      text,
      tempestividade,
      calculationMemory,
      supportingDocuments: selectedComprobatorios,
      othersSupportingDocument: informarOutrosDocumentos ? othersSupportingDocument : "",
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
      valorAbatido,
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/defesas">
          <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nova Defesa</h1>
          <p className="text-gray-600">Defesa de uma "APAC"</p>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700 font-medium">{error}</p>
        </div>
      )}

      {abi && (
        <>
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              Você está realizando a defesa do atendimento <strong>"N° {abi?.numero}"</strong> da <strong>"ABI {abi?.numeroABI}"</strong>
            </p>
          </div>

          <DefesaCardAtendimento abi={abi} />

          <CardFormularioImputacao
            selectedTipo={tipoDoc}
            setSelectedTipo={setTipoDoc}
            textosDefesa={textosDefesa}
            selectedMotivos={selectedMotivos}
            setSelectedMotivos={setSelectedMotivos}
            setHasUserChangedMotivos={setHasUserChangedMotivos}
            text={text}
            setText={setText}
            detalhamentoMotivo={detalhamentoMotivo}
            documentosComprobatorios={documentosComprobatorios}
            selectedComprobatorios={selectedComprobatorios}
            setSelectedComprobatorios={setSelectedComprobatorios}
            informarOutrosDocumentos={informarOutrosDocumentos}
            setInformarOutrosDocumentos={setInformarOutrosDocumentos}
            tempestividade={tempestividade}
            setTempestividade={setTempestividade}
            calculationMemory={calculationMemory}
            setCalculationMemory={setCalculationMemory}
            supportingDocument={supportingDocument}
            setSupportingDocument={setSupportingDocument}
            editorRef={editorRef}
            setOthersSupportingDocument={setOthersSupportingDocument}
            othersSupportingDocument={othersSupportingDocument}
          />

          <CardPedidos
            selectedPedido={selectedPedido}
            setSelectedPedido={setSelectedPedido}
            valorAbatido={valorAbatido}
            setValorAbatido={setValorAbatido}
          />

          <CardDocumentosAnexados
            onDelete={(id: string) => {
              setAnexedDocuments(prev => prev.filter(doc => doc.id !== id))
            }}
            anexedDocuments={anexedDocuments}
          />

          <CardDocumentosAns />

          <DefesaAcoes
            disableButtonSendAns={true}
            anexedDocuments={anexedDocuments}
            isLoading={isLoading}
            loadSalvarDefesa={loadSalvarDefesa}
            onAnexarDocumento={() => setIsAnexarModalOpen(true)}
            onEnviarParaAns={handleEnviarParaAns}
            onSalvarOuAtualizar={handleSalvarDefesa}
            salvarLabel="SALVAR E GERAR DEFESA"
          />
        </>)}
      <AnexarDocumentoDefesaModal
        open={isAnexarModalOpen}
        onOpenChange={setIsAnexarModalOpen}
        onSubmit={handleAnexarDocumento}
      />
    </div>
  )
}
