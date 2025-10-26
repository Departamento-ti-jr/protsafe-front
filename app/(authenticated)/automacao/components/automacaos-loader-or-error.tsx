'use client'

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  loading: boolean
  error: string | null
  onRetry: () => void
}

export default function AbisLoaderOrError({ loading, error, onRetry }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Carregando ABIs...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <p className="text-red-600">{error}</p>
        <Button onClick={onRetry}>Tentar novamente</Button>
      </div>
    )
  }

  return null
}
