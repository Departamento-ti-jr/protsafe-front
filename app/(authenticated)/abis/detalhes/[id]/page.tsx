"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AbisService, type Abi } from "@/lib/services/abis.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import Link from "next/link";

import { PaginationControls } from "@/components/ui/pagination-controls";
import { useDebounce } from "@/hooks/use-debounce";
import { usePagination } from "@/hooks/use-pagination";

import { ABINavigationBreadcrumb } from "../components/abi-navigation-breadcrumb";
import { ABIAtendimentoDetails } from "../components/abi-atendimento-details";
import { ABIProcedimentoDetails } from "../components/abi-procedimento-details";

import { formatDateToDDMMYYYY } from "@/lib/date-helpers";

import { AtendimentosTable } from "../components/abi-atendimentos-table";
import { ArrowLeft } from "lucide-react";
import { Atendimento, AtendimentosService } from "@/lib/services/atendimentos.service";

type ViewMode = "abi" | "atendimento" | "procedimento";

interface AtendimentoItem {
  _id: string;
  tipo: string;
  numeroAihApac: string;
  numeroProcesso: string;
  comp: number | string | null;
  descricao: string;
  dataInicial: string;
  dataFinal: string;
  defesa?: any;
  semDefesa?: boolean;
}

export default function ABIDetalhesPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const router = useRouter();

  const { pagination: atendimentosPaginated, setPagination: setAtendimentoPaginated } =
    usePagination<Atendimento>();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [abi, setAbi] = useState<Abi | null>(null);
  const [id, setId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [atendimentosLoading, setAtendimentosLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // navegação
  const [viewMode, setViewMode] = useState<ViewMode>("abi");
  const [selectedAtendimento, setSelectedAtendimento] =
    useState<AtendimentoItem | null>(null);
  const [selectedProcedimento, setSelectedProcedimento] = useState<any>(null);

  // carregar ID da URL
  useEffect(() => {
    params.then((resolved) => {
      setId(String(resolved.id));
      fetchAbi(String(resolved.id));
    });
  }, [params]);

  useEffect(() => {
    console.log("atendimentosPaginated mudou:", atendimentosPaginated);
  }, [atendimentosPaginated]);

  useEffect(() => {
    if (!abi) return;
    const abiId = Number(abi.id);
    if (abiId) {
      fetchAtendimentos(abiId);
    }
  }, [abi, currentPage, pageSize]);

  // ================================
  // BUSCAR ABI
  // ================================
  const fetchAbi = async (id: string) => {
    try {
      const result = await AbisService.getById(id, { include: ["operadora"] });
      setAbi(result);
    } catch (err) {
      setError("Erro ao carregar ABI.");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // BUSCAR ATENDIMENTOS
  // ================================
  const fetchAtendimentos = async (abiId?: number, registroAns?: number) => {
    try {
      setError(null);
      setAtendimentosLoading(true);

      const response = await AtendimentosService.getAll({
        page: currentPage,
        limit: pageSize,
        abiId: abiId,
        registroAns: registroAns ? String(registroAns) : undefined,
      });

      setAtendimentoPaginated(response);
      console.log("Fetched atendimentos:", atendimentosPaginated);
    } catch (err) {
      setError("Erro ao carregar atendimentos.");
    } finally {
      setAtendimentosLoading(false);
    }
  };

  // ================================
  // HANDLERS
  // ================================
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleViewAtendimento = (atendimento: AtendimentoItem) => {
    setSelectedAtendimento(atendimento);
    setViewMode("atendimento");
  };

  const handleViewProcedimento = (procedimento: any) => {
    setSelectedProcedimento(procedimento);
    setViewMode("procedimento");
  };

  const handleBackToAbi = () => {
    setSelectedAtendimento(null);
    setSelectedProcedimento(null);
    setViewMode("abi");
  };

  const handleBackToAtendimento = () => {
    setSelectedProcedimento(null);
    setViewMode("atendimento");
  };

  const handleNewDefender = (idAtendimento: string) => {
    router.push(`/defesas/nova/${idAtendimento}`);
  };

  const handleEditDefender = (defenceId: string) => {
    router.push(`/defesas/editar/${defenceId}`);
  };

  const handleMarkAsSemDefesa = async (idAtendimento: string) => {
    try {
      await AbisService.markAsSemDefesa(idAtendimento);
      fetchAtendimentos(Number(abi?.numeroAbi), Number(abi?.registroAns));
    } catch (err) {
      console.error(err);
      alert("Erro ao marcar como sem defesa.");
    }
  };

  if (loading) return <div className="p-6">Carregando...</div>;

  if (error || !abi)
    return (
      <div className="p-6 text-red-600">
        {error || "Não foi possível carregar a ABI."}
      </div>
    );

  const getCurrentStep = (): ViewMode => viewMode;

  // ====================================================
  // RENDER
  // ====================================================
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ABINavigationBreadcrumb
        currentStep={getCurrentStep()}
        abiId={id ?? undefined}
        atendimentoId={selectedAtendimento?._id}
        procedimentoId={selectedProcedimento?.id}
        onNavigateToAbi={handleBackToAbi}
        onNavigateToAtendimento={selectedAtendimento ? handleBackToAtendimento : undefined}
      />

      <div className="flex-1 p-6 space-y-6">
        {viewMode === "abi" && (
          <>
            {/* HEADER */}
            <div className="flex items-center gap-4">
              <Link href="/abis">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <div>
                <h1 className="text-2xl font-bold">
                  ABI {abi.numeroAbi}
                </h1>
                <p className="text-sm text-gray-600">
                  Detalhes da ABI {abi.numeroAbi}
                </p>
              </div>
            </div>

            {/* CARD - DETALHES */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da ABI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Número da ABI</p>
                    <p className="font-semibold">{abi.numeroAbi}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Número Processo</p>
                    <p className="font-mono">{abi.numeroProcesso}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Operadora</p>
                    <p>{abi?.operadora?.razaoSocial}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">CNPJ</p>
                    <p>{abi?.operadora?.cnpj}</p>
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* TABELA DE ATENDIMENTOS */}
            <AtendimentosTable
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              atendimentosLoading={atendimentosLoading}
              atendimentosPaginated={atendimentosPaginated}
              currentPage={currentPage}
              pageSize={pageSize}
              formatDateToDDMMYYYY={formatDateToDDMMYYYY}
              handleEditDefender={handleEditDefender}
              handleNewDefender={handleNewDefender}
              handleMarkAsSemDefesa={handleMarkAsSemDefesa}
              handleViewAtendimento={handleViewAtendimento}
            />

            {/* PAGINAÇÃO */}
            <PaginationControls
              currentPage={Number(atendimentosPaginated.page)}
              totalPages={Number(atendimentosPaginated.totalPages)}
              pageSize={atendimentosPaginated.pageSize}
              totalItems={atendimentosPaginated.total}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        )}

        {viewMode === "atendimento" && selectedAtendimento && (
          <ABIAtendimentoDetails
            atendimento={selectedAtendimento}
            onBack={handleBackToAbi}
            onViewProcedimento={handleViewProcedimento}
          />
        )}

        {viewMode === "procedimento" && selectedProcedimento && (
          <ABIProcedimentoDetails
            procedimento={selectedProcedimento}
            onBack={handleBackToAtendimento}
          />
        )}
      </div>
    </div>
  );
}
