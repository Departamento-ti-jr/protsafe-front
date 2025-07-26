"use client"

import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationStep {
  id: string
  label: string
  status: "completed" | "current" | "upcoming"
  href?: string
}

interface ABINavigationBreadcrumbProps {
  currentStep: "abi" | "atendimento" | "procedimento"
  abiId?: string
  atendimentoId?: string
  procedimentoId?: string
}

export function ABINavigationBreadcrumb({
  currentStep,
  abiId,
  atendimentoId,
  procedimentoId,
}: ABINavigationBreadcrumbProps) {
  const steps: NavigationStep[] = [
    {
      id: "abi",
      label: "ABI",
      status: currentStep === "abi" ? "current" : "completed",
      href: abiId ? `/abis/detalhes/${abiId}` : undefined,
    },
    {
      id: "atendimento",
      label: "Atendimento",
      status: currentStep === "atendimento" ? "current" : currentStep === "procedimento" ? "completed" : "upcoming",
      href: abiId && atendimentoId ? `/abis/detalhes/${abiId}/atendimento/${atendimentoId}` : undefined,
    },
    {
      id: "procedimento",
      label: "Procedimento",
      status: currentStep === "procedimento" ? "current" : "upcoming",
      href:
        abiId && atendimentoId && procedimentoId
          ? `/abis/detalhes/${abiId}/atendimento/${atendimentoId}/procedimento/${procedimentoId}`
          : undefined,
    },
  ]

  const getStepIcon = (status: NavigationStep["status"]) => {
    switch (status) {
      case "completed":
        return (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )
      case "current":
        return (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )
      case "upcoming":
        return (
          <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
          </div>
        )
    }
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-1">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                {getStepIcon(step.status)}
                <span
                  className={cn(
                    "font-medium",
                    step.status === "current"
                      ? "text-blue-600"
                      : step.status === "completed"
                        ? "text-gray-900"
                        : "text-gray-400",
                  )}
                >
                  {step.label}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && <div className="absolute left-7 top-11 w-0.5 h-6 bg-gray-200" />}
          </div>
        ))}
      </div>
    </div>
  )
}
