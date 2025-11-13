import { useCallback, useEffect, useMemo, useState } from "react"
import { AbisService } from "@/lib/services/abis.service"
import type { Atendimento } from "@/lib/services/atendimentos.service"

export interface ProcedimentoRelacionado {
  id: string
  tipo?: string
  codigo?: string
  quantidade?: string | number | null
  valor?: string
  descricao?: string
}

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return "R$ 0,00"
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function useProcedimentosRelacionados(atendimento?: (Atendimento & { numeroABI?: string; numeroAbi?: string; CNPJ?: string; codigoBeneficiario?: number | string })) {
  const [procedimentos, setProcedimentos] = useState<ProcedimentoRelacionado[]>([])
  const [loading, setLoading] = useState(false)

  const searchPayload = useMemo(() => {
    if (!atendimento) return null
    const codigoBeneficiario = atendimento.codigoBeneficiario
    const numeroAbi = atendimento.numeroAbi ?? atendimento.numeroABI
    const cnpj = atendimento.CNPJ

    if (!codigoBeneficiario || !numeroAbi) return null

    return {
      codigoBeneficiario: String(codigoBeneficiario),
      numeroAbi: String(numeroAbi),
      cnpj,
    }
  }, [atendimento])

  const loadProcedimentos = useCallback(async () => {
    if (!searchPayload) {
      setProcedimentos([])
      return
    }

    setLoading(true)
    try {
      const response = await AbisService.getAll({
        codigoBeneficiario: searchPayload.codigoBeneficiario,
        numeroABI: searchPayload.numeroAbi,
        cnpj: searchPayload.cnpj,
        limit: 10,
        page: 1,
      })

      const mapped = response.data.map((item) => ({
        id: String(item.id),
        tipo: item.tipoProcedimento,
        codigo: item.codigoProcedimento ? String(item.codigoProcedimento) : undefined,
        quantidade: item.quantidadeProcedimento ?? item.quantidadeProcesso,
        valor: formatCurrency(item.valorTotal),
        descricao: item.descricaoProcedimento ?? item.descricao,
      }))

      setProcedimentos(mapped)
    } catch (error) {
      console.error("Erro ao carregar procedimentos relacionados:", error)
      setProcedimentos([])
    } finally {
      setLoading(false)
    }
  }, [searchPayload])

  useEffect(() => {
    loadProcedimentos()
  }, [loadProcedimentos])

  return {
    procedimentos,
    loading,
    refetch: loadProcedimentos,
  }
}
