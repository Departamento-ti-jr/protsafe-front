"use client"

import { useState } from "react"
import { useSocketEvent } from "./useSocketEvent"

export function SocketExample() {
  const [messages, setMessages] = useState<string[]>([])

  useSocketEvent<string>("message", (payload) => {
    setMessages((prev) => [...prev, payload])
  })

  return (
    <div className="rounded-md border p-4 space-y-2">
      <p className="text-sm font-medium">Eventos recebidos (message)</p>
      <div className="text-xs bg-slate-50 border rounded p-2 min-h-[60px]">
        {messages.length === 0 ? "Aguardando mensagens..." : messages.join(", ")}
      </div>
    </div>
  )
}
