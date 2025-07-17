"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, FileText, Save, Cloud, Calculator, FolderOpen } from "lucide-react"
import Link from "next/link"
import { AnexarDocumentoDefesaModal } from "@/components/anexar-documento-defesa-modal"
import { MultiSelectCheckbox } from "@/components/multi-select-checkbox"
import { TextoDefesa, TextosDefesaService } from "@/lib/services/textos-defesa.service"
import { DocumentoComprobatorio, DocumentosComprobatoriosService } from "@/lib/services/documentos-comprobatorios.service"
import { AnsDocumentosService } from "@/lib/services/ans-documentos.service"

export default function EditarDefesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)

  const [selectedTipo, setSelectedTipo] = useState("recurso")
  const [selectedMotivo, setSelectedMotivo] = useState("16")
  const [selectedPedido, setSelectedPedido] = useState("anulacao-identificacao")
  const [informarOutrosDocumentos, setInformarOutrosDocumentos] = useState(false)

  const [isAnexarModalOpen, setIsAnexarModalOpen] = useState(false)
  const [anexedDocuments, setAnexedDocuments] = useState<any[]>([])
  const [selectedMotivos, setSelectedMotivos] = useState<string[]>([]);
  const [selectedComprobatorios, setSelectedComprobatorios] = useState<string[]>([]);
  const [textosDefesa, setTextosDefesa] = useState<TextoDefesa[]>([]);
  const [documentosComprobatorios, setDocumentosComprobatorios] = useState<DocumentoComprobatorio[]>([]);
  const [error, setError] = useState<string | null>(null);

  const motivos = [
    { label: "08 - COPARTICIPAÇÃO - PRONTO SOCORRO", value: "08-coparticipacao-pronto-socorro" },
    { label: "08 - COPARTICIPAÇÃO - INTERNAÇÃO PSIQUIÁTRICA", value: "08-coparticipacao-internacao-psiquiatrica" },
    { label: "13 – DIVERGÊNCIA NOS VALORES COBRADOS (SIGTAP)", value: "13-divergencia-sigtap" },
    { label: "13 – AUSÊNCIA/RECUSA PRONTUÁRIO", value: "13-ausencia-prontuario" },
    { label: "13 - DEFESA TÉCNICA", value: "13-defesa-tecnica" },
    { label: "13 - BENEFICIÁRIO NÃO PERTENCE À OPS", value: "13-beneficiario-nao-ops" },
    { label: "13 - BENEFICIÁRIO EXCLUÍDO", value: "13-beneficiario-excluido" },
    { label: "13 - IVR", value: "13-ivr" },
    { label: "13 – VALOR COBRADO EM DUPLICIDADE", value: "13-valor-duplicidade" },
    { label: "16 - COBERTURA PARCIAL TEMPORÁRIA PARA DOENÇA OU LESÃO PREEXISTENTE", value: "16-cobertura-parcial" }
  ];

  // Dados de exemplo baseados na imagem fornecida
  const atendimento = {
    id: id,
    status: "201158904222339",
    competencia: "02/2023",
    tipo: "APAC",
    dataInicial: "01-02-2023",
    dataFinal: "27-02-2023",
    numero: "133",
    abi: "97",
  }

  useEffect(() => {
    loadTextosDefesa();
    loadDocumentosComprobatorios();
  },[]);

  const loadTextosDefesa = async () => {
      try {
        const data = await TextosDefesaService.getAll({
          limit: 100000,
        })
        setTextosDefesa(data.data);
      } catch (err) {
        setError("Erro ao carregar textos de defesa. Tente novamente.")
        console.error(err)
      } finally {
      }
  }

  const loadDocumentosComprobatorios = async () => {
      try {
        const data = await DocumentosComprobatoriosService.getAll({
          limit: 100000,
        })
        setDocumentosComprobatorios(data.data);
      } catch (err) {
        setError("Erro ao carregar documentos comprobatórios. Tente novamente.")
        console.error(err)
      } finally {
      }
  }

  const handleAnexarDocumento = async (files: any[], documentType: string) => {
  // Supondo que 'id' é o id_defesa da página
  const id_defesa = id;
  const tipo_documento = documentType;
  const id_protocolo = "0"; // ou passe dinâmico se necessário

  try {
    // Envia todos os arquivos e aguarda terminar tudo
    const uploadedDocs = await Promise.all(
      files.map(async (fileData) => {
        if (!fileData.file) {
          throw new Error("Arquivo inválido");
        }
        const url = await AnsDocumentosService.uploadDocument(
          fileData.file,
          id_defesa,
          tipo_documento,
          id_protocolo
        );
        return {
          id: Math.random().toString(36).substr(2, 9),
          name: fileData.file.name,
          size: fileData.file.size,
          type: documentType,
          url
        };
      })
    );

    setAnexedDocuments((prev) => [...prev, ...uploadedDocs]);
  } catch (error) {
    setError("Erro ao enviar documento(s). Tente novamente.");
    console.error(error);
  }
};


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
          <h1 className="text-2xl font-bold tracking-tight">Editar Defesa</h1>
          <p className="text-gray-600">Defesa de uma "APAC"</p>
        </div>
      </div>

      {/* Context Info */}
      <div className="bg-gray-100 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          Você está realizando a defesa do atendimento <strong>"N° {atendimento.numero}"</strong> da{" "}
          <strong>"ABI {atendimento.abi}"</strong>
        </p>
      </div>

      {/* Atendimento Card */}
      <Card>
        <CardHeader>
          <CardTitle>Atendimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Status</Label>
              <p className="font-medium">{atendimento.status}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Competência</Label>
              <p className="font-medium">{atendimento.competencia}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Tipo</Label>
              <p className="font-medium">{atendimento.tipo}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Data Inicial</Label>
              <p className="font-medium">{atendimento.dataInicial}</p>
            </div>
          </div>
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-500">Data Final</Label>
            <p className="font-medium">{atendimento.dataFinal}</p>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Impugnação/recurso */}
      <Card>
        <CardHeader>
          <CardTitle>Formulário de impugnação/recurso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tipo de Pedido */}
          <div className="space-y-2">
            <Label>Tipo de Pedido</Label>
            <Select value={selectedTipo} onValueChange={setSelectedTipo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recurso">Recurso</SelectItem>
                <SelectItem value="impugnacao">Impugnação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Motivo de Impugnação */}
          <div className="space-y-2">
           <MultiSelectCheckbox
              options={textosDefesa.map(texto => ({ label: texto.nome, value: texto._id }))}
              value={selectedMotivos}
              onChange={setSelectedMotivos}
              label="Motivo de impugnação/recurso"
            />
          </div>

          {/* Detalhamento do Motivo */}
          {selectedMotivo === "16" && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-2">
                <Label className="text-sm">Detalhamento do Motivo</Label>
                <Textarea
                  value="A operadora entende que a cobrança da presente AIH/APAC é indevida porque se trata de DOENÇA E/OU LESÃO PREEXISTENTE.

No momento da contratação, o(a) beneficiário(a) declarou ter ciência ser portador(a) de CATARATA conforme item 21 da DLS em anexo.

Em razão disso, contratou CPT de 24 meses, vencível em 31/05/2024, para a patologia declarada.

O(a) beneficiário(a) utilizou os serviços do SUS em 02/2023 a 27/02/2023 para realizar o procedimento FACOEMULSIFICAÇÃO COM IMPLANTE DE LENTE INTRA-OCULAR DOBRÁVEL, relacionado à doença ou lesão declarada.

Desta forma, conclui-se que no momento da utilização dos serviços do SUS o(a) beneficiário(a) ainda estava cumprindo o período de Cobertura Parcial Temporária.

Conforme os documentos anexos, a adesão ao plano de saúde, na modalidade individual/familiar, ocorreu em 01/06/2022, data em que houve a efetiva assinatura do instrumento contratual. Portanto, ao contrário do que foi alegado, é desnecessária a comprovação do pagamento da primeira mensalidade, uma vez que, conforme já exposto, para fins de contagem de carência e de Cobertura Parcial Temporária (CPT), a operadora considerou, para evitar qualquer prejuízo ao(à) beneficiário(a), a data da assinatura contratual como marco inicial."
                  className="min-h-[200px] resize-none"
                  readOnly
                />
              </div>

              {/* Bottom Section with 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    Tempestividade e Outras Preliminares
                  </Label>
                  <Input placeholder="Informe a tempestividade ou outras preliminares" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-gray-500" />
                    Memória de Cálculo
                  </Label>
                  <Input placeholder="Se necessário, informe a memória de cálculo" />
                </div>

                <div className="space-y-2">
                  <MultiSelectCheckbox
                    options={documentosComprobatorios.map(texto => ({ label: texto.tipo, value: texto._id }))}
                    value={selectedComprobatorios}
                    onChange={setSelectedComprobatorios}
                    label="Documentos Comprobatórios"
                    icon={<FolderOpen className="h-4 w-4 text-gray-500" />}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="outros-documentos"
                  checked={informarOutrosDocumentos}
                  onCheckedChange={setInformarOutrosDocumentos}
                />
                <Label htmlFor="outros-documentos" className="text-sm">
                  Informar outros documentos comprobatórios.
                </Label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedPedido} onValueChange={setSelectedPedido} className="space-y-4">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="anulacao-identificacao" id="anulacao-identificacao" />
              <Label htmlFor="anulacao-identificacao">Anulação da identificação do atendimento.</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="retificacao" id="retificacao" />
              <Label htmlFor="retificacao">Retificação do valor a ser ressarcido.</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="anulacao-subsidiaria" id="anulacao-subsidiaria" />
              <Label htmlFor="anulacao-subsidiaria">
                Anulação da identificação do atendimento ou, subsidiariamente, retificação do valor a ser ressarcido.
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Documentos Anexados */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Anexados</CardTitle>
        </CardHeader>
        <CardContent>
          {anexedDocuments.length > 0 ? (
            <div className="space-y-2">
              {anexedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">Tipo: {doc.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Nenhum documento anexado</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documentos Anexados na ANS */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Anexados na ANS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Nenhum documento anexado na ANS</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" className="rounded-xl bg-transparent" onClick={() => setIsAnexarModalOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          ANEXAR DOCUMENTO
        </Button>
        <Button variant="outline" className="rounded-xl bg-transparent">
          <Cloud className="mr-2 h-4 w-4" />
          INTEGRAR ANS
        </Button>
        <Button className="rounded-xl">
          <Save className="mr-2 h-4 w-4" />
          SALVAR E GERAR DEFESA
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
