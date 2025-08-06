"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, FileText, Save, Cloud } from "lucide-react"
import Link from "next/link"
import { AnexarDocumentoDefesaModal } from "@/components/anexar-documento-defesa-modal"
import { TextoDefesa, TextosDefesaService } from "@/lib/services/textos-defesa.service"
import { DocumentoComprobatorio, DocumentosComprobatoriosService } from "@/lib/services/documentos-comprobatorios.service"
import { AnsDocumentosService } from "@/lib/services/ans-documentos.service"
import { Defesa, DefesasService } from "@/lib/services/defesas.service"
import DefesaCardAtendimento from "../../components/defesas-card-atendimento"
import { Abi, AbisService } from "@/lib/services/abis.service"
import {
  CardFormularioImputacao,
  CardPedidos,
  CardDocumentosAnexados,
  CardDocumentosAns,
} from "../../components/defesa-cards/defesa-cards"

export default function NovaDefesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const [selectedTipo, setSelectedTipo] = useState("recurso")
  const [selectedPedido, setSelectedPedido] = useState("anulacao-identificacao")
  const [informarOutrosDocumentos, setInformarOutrosDocumentos] = useState(false)
  const [defesa, setDefesa] = useState<Defesa>()
  const [abi, setAbi] = useState<Abi>()
  const [isAnexarModalOpen, setIsAnexarModalOpen] = useState(false)
  const [anexedDocuments, setAnexedDocuments] = useState<any[]>([])
  const [selectedMotivos, setSelectedMotivos] = useState<string[]>([])
  const [selectedComprobatorios, setSelectedComprobatorios] = useState<string[]>([])
  const [textosDefesa, setTextosDefesa] = useState<TextoDefesa[]>([])
  const [documentosComprobatorios, setDocumentosComprobatorios] = useState<DocumentoComprobatorio[]>([])
  const [detalhamentoMotivo, setDetalhamentoMotivo] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [preliminary, setPreliminary] = useState("")
  const [calculationMemory, setCalculationMemory] = useState("")
  const [supportingDocument, setSupportingDocument] = useState("")
  const [rectificationValue, setRectificationValue] = useState("")

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

    setDetalhamentoMotivo(textosConcatenados)
  }, [selectedMotivos, textosDefesa])

  const loadDefesa = async () => {
    try {
      const id = await params.then(p => p.id)
      const data = await DefesasService.getById(id)
      setDefesa(data)
      setAbi(data.atendimento[0] as Abi)
    } catch (err) {
      setError("Erro ao carregar defesa. Tente novamente.")
      console.error(err)
    }
  }

  const loadAtendimento = async () => {
    try {
      const id = await params.then(p => p.id)
      const data = await AbisService.getById(id)
      setAbi(data)
    } catch (err) {
      setError("Erro ao carregar defesa. Tente novamente.")
      console.error(err)
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
            url
          }
        })
      )

      setAnexedDocuments((prev) => [...prev, ...uploadedDocs])
    } catch (error) {
      setError("Erro ao enviar documento(s). Tente novamente.")
      console.error(error)
    }
  }

  const handleSalvarDefesa = async () => {
    try {
      if (!abi?._id) return

      const payload = mapDefesaToPayload(abi._id)
      const blob = await DefesasService.create(payload)
      const url = URL.createObjectURL(blob)
      window.open(url) 
      alert("Defesa salva com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar defesa:", error)
      alert("Erro ao salvar defesa. Tente novamente.")
    }
  }


  function mapDefesaToPayload(abiId: string): any {
    return {
      petitionType: selectedTipo,
      text: detalhamentoMotivo,
      preliminary,
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
      rectificationValue: rectificationValue,
      defencesText: selectedMotivos,
      atendimento: abiId,
      id_Attendance: abiId,
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
          <p className="text-gray-600">Defesa de uma "APAC"</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          Você está realizando a defesa do atendimento <strong>"N° {abi?.numero}"</strong> da <strong>"ABI {abi?.numeroABI}"</strong>
        </p>
      </div>

      <DefesaCardAtendimento abi={abi} />

      <CardFormularioImputacao
        selectedTipo={selectedTipo}
        setSelectedTipo={setSelectedTipo}
        textosDefesa={textosDefesa}
        selectedMotivos={selectedMotivos}
        setSelectedMotivos={setSelectedMotivos}
        detalhamentoMotivo={detalhamentoMotivo}
        documentosComprobatorios={documentosComprobatorios}
        selectedComprobatorios={selectedComprobatorios}
        setSelectedComprobatorios={setSelectedComprobatorios}
        informarOutrosDocumentos={informarOutrosDocumentos}
        setInformarOutrosDocumentos={setInformarOutrosDocumentos}
        preliminary={preliminary}
        setPreliminary={setPreliminary}
        calculationMemory={calculationMemory}
        setCalculationMemory={setCalculationMemory}
        supportingDocument={supportingDocument}
        setSupportingDocument={setSupportingDocument}
      />


      <CardPedidos selectedPedido={selectedPedido} setSelectedPedido={setSelectedPedido} />

      <CardDocumentosAnexados anexedDocuments={anexedDocuments} />

      <CardDocumentosAns />

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="rounded-xl bg-transparent" onClick={() => setIsAnexarModalOpen(true)}>
          <Upload className="mr-2 h-4 w-4" /> ANEXAR DOCUMENTO
        </Button>
        <Button variant="outline" className="rounded-xl bg-transparent">
          <Cloud className="mr-2 h-4 w-4" /> INTEGRAR ANS
        </Button>
        <Button className="rounded-xl" onClick={handleSalvarDefesa}>
          <Save className="mr-2 h-4 w-4" /> SALVAR E GERAR DEFESA
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
