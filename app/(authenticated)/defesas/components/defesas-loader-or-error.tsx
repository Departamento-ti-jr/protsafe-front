"use client"

import { AlertCircle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface DefesasLoaderOrErrorProps {
  loading: boolean
  error: string | null
  onRetry: () => void
}

export default function DefesasLoaderOrError({
  loading,
  error,
  onRetry,
}: DefesasLoaderOrErrorProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner className="h-6 w-6 text-blue-500 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="text-sm text-red-500">{error}</p>
        <Button onClick={onRetry} className="flex items-center gap-2">
          <RefreshCcw className="w-4 h-4" />
          Tentar novamente
        </Button>
      </div>
    )
  }

  return null
}
