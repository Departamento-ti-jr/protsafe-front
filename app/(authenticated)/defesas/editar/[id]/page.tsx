"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Save, Cloud } from "lucide-react"
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
import { useDocumentosAns } from "@/hooks/use-anexar-documento"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";


export default function EditarDefesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) // id da defesa

  const { toast } = useToast()

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
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
  const [valorAbatido, setValorAbatido] = useState("");
  const [othersSupportingDocument, setOthersSupportingDocument] = useState("");
  const [isTextLoadedFromDefesa, setIsTextLoadedFromDefesa] = useState(false);
  const [hasUserChangedMotivos, setHasUserChangedMotivos] = useState(false);

  const { loadDocumentosSalvos, handleAnexarDocumento, isLoading } = useDocumentosAns(abi, setAnexedDocuments, setError)

  useEffect(() => {
  const init = async () => {
    const defesaData = await loadDefesa();
    if (defesaData) {
      await Promise.all([loadTextosDefesa(), loadDocumentosComprobatorios()]);
      setIsTextLoadedFromDefesa(true);
    }
  };
  init();
}, []);

// ✅ Esse useEffect só atualiza o texto se o usuário mexer no dropdown
useEffect(() => {
  if (!hasUserChangedMotivos) return;

  const textosConcatenados = textosDefesa
    .filter(t => selectedMotivos.includes(t._id))
    .map(t => t.texto)
    .join("\n\n");

  setText(textosConcatenados);
}, [selectedMotivos, textosDefesa, hasUserChangedMotivos]);

  useEffect(() => {
    if (abi?._id) {
      loadDocumentosSalvos(abi._id)
    }
  }, [abi])

  const loadDefesa = async (): Promise<Defesa | null> => {
    try {
      const data = await DefesasService.findOneWithDocuments(id)
      if (!data) {
        setDefesa(null)
        setError("Defesa não encontrada.")
        return null
      }

      console.log("data: ", data);
      setDefesa(data)
      setTipoDoc(data.petitionType)
      setTempestividade(data.tempestividade || "")
      setCalculationMemory(data.calculationMemory || "")
      setSupportingDocument(data.supportingDocument || "")
      setRectificationValue(data.rectificationValue || "")
      setSelectedMotivos(data.defencesText?.map((d: any) => d._id) || [])
      setSelectedComprobatorios(data.supportingDocuments?.map((d: any) => d._id) || [])
      setInformarOutrosDocumentos(String(data?.othersSupportingDocument) ? true : false);
      setOthersSupportingDocument(String(data?.othersSupportingDocument));
      setAbi({...data.atendimento, operadora: data.operadora} );
      setText(data.text || "")
      setSelectedPedido(
        data.orderOption === 2
          ? 'retificacao'
          : data.orderOption === 3
            ? 'anulacao-subsidiaria'
            : 'anulacao-identificacao'
      )
      setValorAbatido(data.valorAbatido);

      return data
    } catch (err: any) {
      if (err?.status == 404) {
        setDefesa(null)
        setError("Defesa não encontrada.")
      } else {
        setError("Erro ao carregar defesa.")
      }
      return null
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

  const handleEnviarParaAns = async () => {

    if (!abi?._id) {
      toast({
        variant: "warning",
        title: "Aviso",
        description: "Atendimento não encontrado.",
      });
      return;
    }

    // ✅ 1. Verifica se há documentos anexados
    if (!anexedDocuments || anexedDocuments.length === 0) {
      const confirmar = window.confirm(
        "Não existem documentos anexados. Deseja enviar mesmo assim?"
      );
      if (!confirmar) {
        toast({
          variant: "warning",
          title: "Envio cancelado",
          description: "O envio foi cancelado pelo usuário.",
        });
        return;
      }
    }

    try {
      toast({
        title: "Enviando...",
        description: `Enviando documentos da ABI para a ANS...`,
      });

      const result = await AnsDocumentosService.enviarDocumentosParaAns(abi._id);

      toast({
        title: "Sucesso!",
        description: result?.message || "Documentos enviados com sucesso à ANS.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error?.message || "Falha ao enviar documentos para a ANS.",
      });
    }
  };

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
    console.log(selectedMotivos)
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
      valorAbatido: valorAbatido
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

      
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-700 font-medium">{error}</p>
        </div>
      )}

      {defesa && (
        <>
          {abi && <DefesaCardAtendimento abi={abi} />}

          <CardFormularioImputacao
            selectedTipo={tipoDoc}
            setSelectedTipo={setTipoDoc}
            textosDefesa={textosDefesa}
            selectedMotivos={selectedMotivos}
            setSelectedMotivos={setSelectedMotivos}
            text={text}
            setText={setText}
            setHasUserChangedMotivos={setHasUserChangedMotivos}
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
              setAnexedDocuments((prev: any[]) => prev.filter(doc => doc.id !== id));
            }}
            anexedDocuments={anexedDocuments}
          />
          <CardDocumentosAns />

          <div className="flex justify-end gap-4">
            <Button disabled={isLoading} variant="outline" className="rounded-xl bg-transparent" onClick={() => setIsAnexarModalOpen(true)}>
              <Upload className="mr-2 h-4 w-4" /> {isLoading ? "Enviando..." : "ANEXAR DOCUMENTO"}
            </Button>
            <Button
              variant="outline"
              className="rounded-xl bg-transparent"
              onClick={() => {
                if (!anexedDocuments || anexedDocuments.length === 0) {
                  setIsConfirmDialogOpen(true);
                } else {
                  handleEnviarParaAns();
                }
              }}
            >
              <Cloud className="mr-2 h-4 w-4" /> INTEGRAR ANS
            </Button>

            <Button
              className="rounded-xl"
              onClick={handleAtualizarDefesa}
              disabled={loadSalvarDefesa}
            >
              <Save className="mr-2 h-4 w-4" />
              {loadSalvarDefesa ? "ATUALIZANDO..." : "ATUALIZAR DEFESA"}
            </Button>
          </div>

          <AnexarDocumentoDefesaModal
            open={isAnexarModalOpen}
            onOpenChange={setIsAnexarModalOpen}
            onSubmit={(files, type) => handleAnexarDocumento(files, type)}
          />
        </>
      )}

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Atenção</AlertDialogTitle>
          <AlertDialogDescription>
            Não existem documentos anexados. Deseja enviar mesmo assim?
          </AlertDialogDescription>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setIsConfirmDialogOpen(false);
                handleEnviarParaAns();
              }}
            >
              Enviar mesmo assim
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )

}
