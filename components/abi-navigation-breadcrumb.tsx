"use client"

import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const steps = [
    {
      id: "abi",
      label: "ABI",
      completed: currentStep === "atendimento" || currentStep === "procedimento",
      current: currentStep === "abi",
    },
    {
      id: "atendimento",
      label: "Atendimento",
      completed: currentStep === "procedimento",
      current: currentStep === "atendimento",
    },
    {
      id: "procedimento",
      label: "Procedimento",
      completed: false,
      current: currentStep === "procedimento",
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-modernize-gray-200 p-3">
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-modernize-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                  step.completed && "bg-blue-500 text-white",
                  step.current && !step.completed && "bg-blue-500 text-white",
                  !step.completed && !step.current && "border-2 border-gray-300 text-gray-400",
                )}
              >
                {step.completed ? (
                  <Check className="w-3 h-3" />
                ) : step.current ? (
                  <div className="w-2 h-2 bg-white rounded-full" />
                ) : (
                  <div className="w-2 h-2 border border-gray-400 rounded-full" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  step.current && "text-blue-600",
                  step.completed && "text-gray-700",
                  !step.completed && !step.current && "text-gray-400",
                )}
              >
                {step.label}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  )
}
