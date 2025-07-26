"use client"

import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationStep {
  id: string
  label: string
  completed: boolean
  current: boolean
}

interface ABINavigationBreadcrumbProps {
  steps: NavigationStep[]
}

export function ABINavigationBreadcrumb({ steps }: ABINavigationBreadcrumbProps) {
  return (
    <div className="w-48 bg-gray-50 border-r border-gray-200 p-4">
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-3">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border-2",
                step.completed || step.current
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-500",
              )}
            >
              {step.completed ? (
                <Check className="h-3 w-3" />
              ) : (
                <span className="text-xs font-medium">{step.current ? "●" : "○"}</span>
              )}
            </div>
            <div className="flex-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  step.current ? "text-blue-600" : step.completed ? "text-gray-900" : "text-gray-500",
                )}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && <ChevronDown className="h-4 w-4 text-gray-400" />}
          </div>
        ))}
      </div>
    </div>
  )
}
