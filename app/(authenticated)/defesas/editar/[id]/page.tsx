"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnexarDocumentoDefesaModal } from "@/components/anexar-documento-defesa-modal"
import { TextoDefesa, TextosDefesaService } from "@/lib/services/textos-defesa.service"
import { DocumentoComprobatorio, DocumentosComprobatoriosService } from "@/lib/services/documentos-comprobatorios.service"
import { AnsDocumentosService } from "@/lib/services/ans-documentos.service"
import { Defesa, DefesasService } from "@/lib/services/defesas.service"
import { Abi } from "@/lib/services/abis.service"
import DefesaCardAtendimento from "../../components/defesas-card-atendimento"
import {
  CardFormularioImputacao,
  CardPedidos,
  CardDocumentosAnexados,
  CardDocumentosAns,
} from "../../components/defesa-cards/defesa-cards"
import { useToast } from "@/hooks/use-toast"

export default function EditarDefesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) // id da defesa
  const router = useRouter()
  const { toast } = useToast()

  // estados
  const [defesa, setDefesa] = useState<Defesa | null>(null)
  const [tipoDoc, setTipoDoc] = useState<"RECURSO" | "IMPUGNACAO">("RECURSO")
  const [selectedPedido, setSelectedPedido] = useState("anulacao-identificacao")
  const [tempestividade, setTempestividade] = useState("")
  const [informarOutrosDocumentos, setInformarOutrosDocumentos] = useState(false)
  const [loadSalvarDefesa, setLoadSalvarDefesa] = useState(false)
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

  // carregar dados iniciais
  useEffect(() => {
    loadDefesa()
    loadTextosDefesa()
    loadDocumentosComprobatorios()
  }, [])

  const loadDefesa = async () => {
    try {
      const data = await DefesasService.findOneWithDocuments(id)
      setDefesa(data)

      // preencher estados iniciais
      setTipoDoc(data.petitionType)
      setTempestividade(data.tempestividade || "")
      setCalculationMemory(data.calculationMemory || "")
      setSupportingDocument(data.supportingDocument || "")
      setRectificationValue(data.rectificationValue || "")
      setSelectedMotivos(data.defencesText?.map((d: any) => d._id) || [])
      setSelectedComprobatorios(data.supportingDocuments?.map((d: any) => d._id) || [])
      setInformarOutrosDocumentos(data.othersSupportingDocument || false)
      setAbi(data.atendimento?.[0])
      setText(data.text || "")
    } catch (err) {
      setError("Erro ao carregar defesa.")
      console.error(err)
    }
  }

  const loadTextosDefesa = async () => {
    try {
      const data = await TextosDefesaService.getAll({ limit: 100000 })
      setTextosDefesa(data.data)
    } catch (err) {
      setError("Erro ao carregar textos de defesa.")
      console.error(err)
    }
  }

  const loadDocumentosComprobatorios = async () => {
    try {
      const data = await DocumentosComprobatoriosService.getAll({ limit: 100000 })
      setDocumentosComprobatorios(data.data)
    } catch (err) {
      setError("Erro ao carregar documentos comprobatórios.")
      console.error(err)
    }
  }

  const handleAnexarDocumento = async (files: any[], documentType: string) => {
    const id_defesa = id
    const tipo_documento = documentType
    const id_protocolo = "0"

    try {
      const uploadedDocs = await Promise.all(
        files.map(async (fileData) => {
          if (!fileData.file) throw new Error("Arquivo inválido")
          const url = await AnsDocumentosService.uploadDocument(
            fileData.file,
            id_defesa,
            tipo_documento,
            id_protocolo
          )
          return {
            id: Math.random().toString(36).substr(2, 9),
            name: fileData.file.name,
            size: fileData.file.size,
            type: documentType,
            url,
          }
        })
      )
      setAnexedDocuments((prev) => [...prev, ...uploadedDocs])
    } catch (error) {
      setError("Erro ao enviar documento(s). Tente novamente.")
      console.error(error)
    }
  }

  const handleAtualizarDefesa = async () => {
    try {
      setLoadSalvarDefesa(true)

      if (!defesa?._id) return

      const payload = mapDefesaToPayload(abi?._id || "")
      console.log("Payload para atualizar defesa:", payload)

      await DefesasService.update(defesa._id, payload)

      toast({
        title: "Sucesso!",
        description: "Defesa atualizada.",
      })

      // router.push("/defesas")
    } catch (error: any) {
      const apiMessage =
        error?.body?.message || error?.statusText || "Erro ao atualizar defesa."

      toast({
        variant: "warning",
        title: "Aviso",
        description: apiMessage,
      })

      setError(apiMessage)
    } finally {
      setLoadSalvarDefesa(false)
    }
  }

  function mapDefesaToPayload(abiId: string): any {
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/defesas">
          <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar Defesa</h1>
          <p className="text-gray-600">Atualize os dados da defesa</p>
        </div>
      </div>

      {abi && <DefesaCardAtendimento abi={abi} />}

      <CardFormularioImputacao
        selectedTipo={tipoDoc}
        setSelectedTipo={setTipoDoc}
        textosDefesa={textosDefesa}
        selectedMotivos={selectedMotivos}
        setSelectedMotivos={setSelectedMotivos}
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
      />

      <CardPedidos selectedPedido={selectedPedido} setSelectedPedido={setSelectedPedido} />

      <CardDocumentosAnexados anexedDocuments={anexedDocuments} />
      <CardDocumentosAns />

      <div className="flex justify-end gap-4">
        <Button
          className="rounded-xl"
          onClick={handleAtualizarDefesa}
          disabled={loadSalvarDefesa}
        >
          <Save className="mr-2 h-4 w-4" />{" "}
          {loadSalvarDefesa ? "ATUALIZANDO..." : "ATUALIZAR DEFESA"}
        </Button>
      </div>

      <AnexarDocumentoDefesaModal
        open={isAnexarModalOpen}
        onOpenChange={setIsAnexarModalOpen}
        onSubmit={handleAnexarDocumento}
      />
    </div>
  )
}
