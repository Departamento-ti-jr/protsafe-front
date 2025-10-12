import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Calculator, FolderOpen, Download, Eye, Trash } from "lucide-react"
import { MultiSelectCheckbox } from "@/components/multi-select-checkbox"
import { Button } from "@/components/ui/button"
import RichTextEditor from "@/components/rich-text-editor"
import { AnsDocumentosService } from "@/lib/services/ans-documentos.service"
import RichTextEditorWrapper from "@/components/RichTextEditorWrapper";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import MarkdownEditor from "@/components/MarkdownEditor"
import HtmlEditor from "@/components/MarkdownEditor"
import HtmlRenderer from "@/components/HtmlRenderer"
import RichTextEditorWithPreview from "@/components/RichTextEditorWithPreview"
import React from "react"

export const CardFormularioImputacao = React.memo(function CardFormularioImputacao({
  selectedTipo,
  setSelectedTipo,
  textosDefesa,
  tempestividade,
  setTempestividade,
  selectedMotivos,
  setSelectedMotivos,
  text,
  setText,
  documentosComprobatorios,
  calculationMemory,
  setCalculationMemory,
  selectedComprobatorios,
  setSelectedComprobatorios,
  informarOutrosDocumentos,
  setInformarOutrosDocumentos,
  editorRef
}: any) {

  console.log("Renderizando CardFormularioImputacao com text:", text);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulário de impugnação/recurso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Tipo de Pedido</Label>
          <Select value={selectedTipo || ""} onValueChange={setSelectedTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de pedido" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RECURSO">Recurso</SelectItem>
              <SelectItem value="IMPUGNACAO">Impugnação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <MultiSelectCheckbox
          options={textosDefesa.map((texto: any) => ({ label: texto.nome, value: texto._id }))}
          value={selectedMotivos}
          onChange={setSelectedMotivos}
          label="Motivo de impugnação/recurso"
        />

        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div id="rich-text" className="space-y-2">
            <Label className="text-sm">Detalhamento do Motivo</Label>

            <RichTextEditorWrapper
              initialValue={text}
              onChange={(html: string) => {
                setText((prev: string) => (prev === html ? prev : html));
              }}
            />

            {/* <RichTextEditorWithPreview
              initialValue={text}
              onChange={(htmlComNbsp: string) => {
                setText((prev: string) => {
                  // ⚠️ evita re-render se o valor for idêntico
                  if (prev === htmlComNbsp) return prev;
                  return htmlComNbsp;
                });
              }}
            /> */}

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                Tempestividade e Outras Preliminares
              </Label>
              <Input
                placeholder="Informe a tempestividade ou outras preliminares"
                value={tempestividade ?? ""}
                onChange={(e) => setTempestividade(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <Calculator className="h-4 w-4 text-gray-500" />
                Memória de Cálculo
              </Label>
              <Input
                placeholder="Se necessário, informe a memória de cálculo"
                value={calculationMemory ?? ""}
                onChange={(e) => setCalculationMemory(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <MultiSelectCheckbox
                options={documentosComprobatorios.map((doc: any) => ({ label: doc.tipo, value: doc._id }))}
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
      </CardContent>
    </Card>
  )
});

export function CardPedidos({ selectedPedido, setSelectedPedido }: any) {
  return (
    <Card>
      <CardHeader><CardTitle>Pedidos</CardTitle></CardHeader>
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
  )
}

export function CardDocumentosAnexados({ anexedDocuments, onDelete }: any) {
  return (
    <Card>
      <CardHeader><CardTitle>Documentos Anexados</CardTitle></CardHeader>
      <CardContent>
        {anexedDocuments.length > 0 ? (
          <div className="space-y-2">
            {anexedDocuments.map((doc: any) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">Tipo: {doc.type}</p>
                  </div>
                </div>

                {doc.caminho && (
                  <div className="flex justify-end gap-2">
                    {/* Botão de visualizar */}
                    <Button
                      asChild
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                    >
                      <a
                        href={doc.caminho}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={doc.name || "documento.pdf"}
                      >
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>

                    {/* Botão de deletar com popup */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="rounded-full"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir documento</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o documento{" "}
                            <span className="font-semibold">{doc.name}</span>?
                            Essa ação não poderá ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => {
                              try {
                                await AnsDocumentosService.deleteDocument(doc.id);
                                onDelete?.(doc._id);
                              } catch (error) {
                                alert("Erro ao excluir documento");
                              }
                            }}
                          >
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
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
  )
}


export function CardDocumentosAns() {
  return (
    <Card>
      <CardHeader><CardTitle>Documentos Anexados na ANS</CardTitle></CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-500">Nenhum documento anexado na ANS</p>
        </div>
      </CardContent>
    </Card>
  )
}
