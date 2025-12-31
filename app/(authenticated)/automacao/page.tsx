'use client'

import AbisFilters from "./_components/automacao-filters"
import AbisPagination from "./_components/automacao-pagination"
import { useComposicaoAbisList } from "./hooks/use-composicao-abis-list"
import AutomacaoTable from "./_components/automacao-table"
import { useEffect, useRef, useState } from "react"
import { useLoadingIndicator } from "@/components/loading-indicator"
import { ComposicaoDadosAnsService } from "@/lib/services/composicao-dados-ans.service"
import { Button } from "@/components/ui/button"

export default function AutomacaoPage() {
  const {
    data,
    loading,
    error,
    filters,
    pagination,
    handleSearch,
    handleStatusChange,
    handlePageChange,
    handlePageSizeChange,
    refetch,
  } = useComposicaoAbisList()

  const { startLoading, stopLoading } = useLoadingIndicator();
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleUploadFile = async (file: File) => {
    try {
      setUploading(true)
      const res = await ComposicaoDadosAnsService.uploadCsv(file)
      setUploadResult(res)
    } catch (err) {
      console.error(err)
      const httpError = err as any
      if (httpError?.status === 400 && httpError.body) {
        setUploadResult(httpError.body)
      } else {
        const fallback = httpError?.body ?? httpError ?? { mensagem: "Falha ao enviar o CSV." }
        setUploadResult(fallback)
      }
    } finally {
      setShowModal(true)
      setUploading(false)
    }
  }

  useEffect(() => {
    loading ? startLoading() : stopLoading();
  }, [loading]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Automação</h1>

      {/* <AbisLoaderOrError loading={loading} error={error} onRetry={refetch} /> */}


      <>
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <AbisFilters
                searchTerm={filters.search}
                onSearch={handleSearch}
                statusFilter={filters.status}
                onStatusChange={handleStatusChange}
                onUploadClick={() => setShowUploadModal(true)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <AutomacaoTable data={data.data} loading={loading} />

          <div className="border-t border-slate-100 p-4 bg-slate-50/30">
            <AbisPagination
              currentPage={pagination.page}
              totalPages={data.totalPages}
              totalItems={data.total}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </div>
      </>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return
          await handleUploadFile(file)
          e.target.value = ""
        }}
        />

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upload de documento (.csv)</h2>
              <button className="text-sm text-gray-500" onClick={() => { setShowUploadModal(false); setDragOver(false); }}>Fechar</button>
            </div>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragOver ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-slate-50/60"}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  handleUploadFile(file);
                }
              }}
            >
              <p className="text-sm text-slate-600">Arraste e solte o arquivo CSV aqui</p>
              <p className="text-xs text-slate-500 mb-3">ou</p>
              <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                {uploading ? "Enviando..." : "Selecionar arquivo"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Resultado do upload</h2>
              <button className="text-sm text-gray-500" onClick={() => setShowModal(false)}>Fechar</button>
            </div>
            {uploading ? (
              <p>Enviando...</p>
            ) : uploadResult ? (
              (() => {
                const payload: any = uploadResult?.body ?? uploadResult
                return (
                  <div className="space-y-3">
                    {"inseridos" in payload && "rejeitados" in payload ? (
                      <>
                        <p className="text-sm">Inseridos: <b>{payload.inseridos}</b></p>
                        <p className="text-sm">Rejeitados: <b>{payload.rejeitados}</b></p>
                        {Array.isArray(payload.erros) && payload.erros.length > 0 && (
                          <div className="border rounded p-3 max-h-72 overflow-auto text-xs space-y-2 bg-slate-50">
                            {payload.erros.map((err: any, idx: number) => (
                              <div key={idx} className="border-b pb-2 last:border-0 last:pb-0">
                                <p className="font-semibold">Linha: {err.linha}</p>
                                <p className="text-red-600">{Array.isArray(err.mensagens) ? err.mensagens.join("; ") : err.mensagens}</p>
                                {err.dados && (
                                  <pre className="bg-white border rounded p-2 mt-1 overflow-x-auto">
                                    {JSON.stringify(err.dados, null, 2)}
                                  </pre>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        {payload.mensagem && <p className="text-sm text-red-600 font-semibold">{payload.mensagem}</p>}
                        {Array.isArray(payload.erros) && payload.erros.length > 0 && (
                          <ul className="list-disc pl-5 text-sm text-red-600 space-y-1">
                            {payload.erros.map((msg: any, idx: number) => (
                              <li key={idx}>{msg}</li>
                            ))}
                          </ul>
                        )}
                        {!payload.mensagem && !payload.erros && (
                          <p className="text-sm text-red-600">Não foi possível ler o retorno da API.</p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })()
            ) : (
              <p className="text-sm">Nenhum retorno disponível.</p>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
