"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Socket } from "socket.io-client"
import { getSocketClient } from "./socket.client"

interface SocketContextValue {
  socket: Socket | null
  connected: boolean
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  connected: false,
})

export function SocketProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const socket = useMemo(() => getSocketClient(), [])

  useEffect(() => {
    if (!socket) return

    const handleConnect = () => setConnected(true)
    const handleDisconnect = () => setConnected(false)

    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)

    // garante tentativa de conexão
    if (!socket.connected) socket.connect()

    return () => {
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
    }
  }, [socket])

  const value = useMemo(
    () => ({
      socket,
      connected,
    }),
    [socket, connected],
  )

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export function useSocketContext() {
  return useContext(SocketContext)
}
