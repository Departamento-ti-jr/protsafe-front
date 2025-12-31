import { useCallback, useEffect, useMemo, useState } from "react"
import { AbisService } from "@/lib/services/abis.service"
import { AtendimentosService, type Atendimento } from "@/lib/services/atendimentos.service"

export interface ProcedimentoRelacionado {
  id: number
  tipo?: string
  codigo?: string
  quantidade?: string | number | null
  valor?: string
  descricao?: string
}

interface ProcedimentoSearchPayload {
  numeroAbi: string
  codigoBeneficiario?: string
  cnpj?: string
}

const formatCurrency = (value?: any) => {
  if (value === undefined || value === null) return "R$ 0,00"

  const normalized =
    typeof value === "string"
      ? value.replace(/\./g, "").replace(",", ".")
      : value

  const numberValue = Number(normalized)

  if (Number.isNaN(numberValue)) return "R$ 0,00"

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function useProcedimentosRelacionados(
    atendimento?: Atendimento & {
    numeroABI?: string
    numeroAbi?: string
    CNPJ?: string
    cnpj?: string
    codigoBeneficiario?: number | string
  }
) {
  const [procedimentos, setProcedimentos] = useState<ProcedimentoRelacionado[]>([])
  const [loading, setLoading] = useState(false)

  const searchPayload = useMemo<ProcedimentoSearchPayload | null>(() => {
    if (!atendimento) return null

    const numeroAbi =
      atendimento.numeroAbi ??
      atendimento.numeroABI ??
      atendimento.abi?.numeroAbi ??
      atendimento.abi?.numeroABI ??
      atendimento.abi?.id

    if (!numeroAbi) return null

    const codigoBeneficiario = atendimento.codigoBeneficiario ?? atendimento.abi?.codigoBeneficiario
    const cnpj =
      atendimento.CNPJ ??
      atendimento.cnpj ??
      atendimento.abi?.CNPJ ??
      atendimento.abi?.cnpj ??
      atendimento.abi?.operadora?.cnpj

    return {
      numeroAbi: String(numeroAbi),
      codigoBeneficiario: codigoBeneficiario ? String(codigoBeneficiario) : undefined,
      cnpj: cnpj ? String(cnpj) : undefined,
    }
  }, [
    atendimento?.CNPJ,
    atendimento?.abi?.CNPJ,
    atendimento?.abi?.cnpj,
    atendimento?.abi?.codigoBeneficiario,
    atendimento?.abi?.id,
    atendimento?.abi?.numeroABI,
    atendimento?.abi?.numeroAbi,
    atendimento?.abi?.operadora?.cnpj,
    atendimento?.cnpj,
    atendimento?.codigoBeneficiario,
    atendimento?.numeroABI,
    atendimento?.numeroAbi,
  ])

  const loadProcedimentos = useCallback(async () => {
    if (!searchPayload?.numeroAbi) {
      setProcedimentos([])
      return
    }

    setLoading(true)
    try {
      const response = await AtendimentosService.getProcedumentosByAtendimentoId(atendimento?.id as number);

      const mapped = response.map((item) => ({
        id: item.id,
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
