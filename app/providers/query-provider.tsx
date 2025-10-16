"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

export function QueryProvider({ children }: { children: ReactNode }) {
  // Evita recriar o cliente a cada renderização
  const [client] = useState(() => new QueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
