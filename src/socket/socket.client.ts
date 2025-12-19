"use client"

import { io, type Socket } from "socket.io-client"

let socket: Socket | null = null

function createSocket(): Socket | null {
  if (typeof window === "undefined") return null

  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080"

  socket = io(url, {
    autoConnect: true,
    withCredentials: true,
    // NÃO force websocket
    transports: ["polling", "websocket"] // opcional
  })

  return socket
}

export function getSocketClient(): Socket | null {
  if (!socket) {
    socket = createSocket()
  }
  return socket
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
